import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createUserTest, removeTestUser, removeAllTestContact, createTestContact, getTestContact, createManyContacts } from "./test-util";

describe("POST /api/contacts", () => {
    beforeEach(async() => {
        await createUserTest();
    });

    afterEach(async() => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can create contact", async() => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                phone: "0933853814813"
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("0933853814813");
    });

    it("should reject if request is invalid", async() => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "0933853814813989582989839028908209385098239058"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should can get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});


describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can update contact", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "test123",
                last_name: "test123",
                email: "test123@gmail.com",
                phone: "093385381481"
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.first_name).toBe("test123");
        expect(result.body.data.last_name).toBe("test123");
        expect(result.body.data.email).toBe("test123@gmail.com");
        expect(result.body.data.phone).toBe("093385381481");
    });


    it("should reject if request is invalid", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "093385381481"
            });
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can delete contact", async() => {
        let testContact = await getTestContact();

        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it("should reject if contact is not found", async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .delete("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await createUserTest();
        await createManyContacts();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can search without parameter", async() => {
        const result = await supertest(web)
            .get("/api/contacts")
            .set('Authorization', 'test');

        // logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it("should can go to 2nd page", async() => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                page: 2
            })
            .set('Authorization', 'test');
        
        // logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });
});