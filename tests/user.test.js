import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";
import { createUserTest, removeTestUser , getTestUser } from "./test-util";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
    afterEach(async() => {
        removeTestUser();
    });

    it("shloud can create user data", async() => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'password',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it("shloud throw error when the input doesn't valid", async() => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject when the username already registered", async() => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'password',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'password',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("POST /api/users/login", () => {
    beforeEach(async() => {
        await createUserTest();
    });

    afterEach(async() => {
        await removeTestUser();
    });

    it("should be able to login", async() => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "password"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it("should reject login request", async() => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'password123'
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createUserTest();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("UPDATE /api/users/current", () => {
    beforeEach(async () => {
        await createUserTest();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can update password and name", async() => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'test2',
                password: "password1234"
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test2');
        
        const user = await getTestUser();
        expect(await bcrypt.compare("password1234", user.password)).toBe(true);
    });

    it("should can update name", async() => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'test2',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test2');
    });

    it("should can update password", async() => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: "password1234"
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        const user = await getTestUser();
        expect(await bcrypt.compare("password1234", user.password)).toBe(true);
    });

    it("should reject if token is invalid", async() => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'salah')
            .send({
                name: 'test2',
                password: "password1234"
            });
        
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/users/logout", () => {
    beforeEach(async() => {
        await createUserTest();
    });

    afterEach(async() => {

        await removeTestUser();
    });

    it("should can logout account", async() => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("logout success");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it("should reject if token is invalid", async() => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

