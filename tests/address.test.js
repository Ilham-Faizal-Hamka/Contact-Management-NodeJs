import supertest from "supertest";
import { web } from "../src/application/web";
import { removeAllTestAddresses, createUserTest, createTestContact, removeAllTestContact, removeTestUser, getTestContact, createTestAddress, getTestAddress} from "./test-util";

describe("POST /api/contacts/:contactId/address", () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can create addresses", async() => {
        const testContact = await getTestContact();


        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: 'kota test',
                province: 'provinsi test',
                country: 'indonesia',
                postal_code: '234234'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");
    });

    it("should reject if request is invalid", async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: 'kota test',
                province: 'provinsi test',
                country: '',
                postal_code: '234234'
            });
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if user is unauthorized", async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .send({
                street: "jalan test",
                city: 'kota test',
                province: 'provinsi test',
                country: 'indonesia',
                postal_code: '234234'
            });
        
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
        await createTestAddress();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can get address", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
            .set("Authorization", "test");
        
        expect(result.status).toBe(200);
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("234234");
    });

    it('should cannot find adddress if contact is not found', async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id +1) + "/addresses/" + testAddress.id)
            .set("Authorization", "test");
        
        expect(result.status).toBe(404);
    });

    it("should cannot find address if address is not found", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id+1))
            .set("Authorization", "test");
        
        expect(result.status).toBe(404);
    });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
        await createTestAddress();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can update contact", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
            .set("Authorization", "test")
            .send({
                street: "jalan test update",
                city: 'city test update',
                province: 'province test update',
                country: 'indonesia update',
                postal_code: '234234 update'
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.street).toBe("jalan test update");
        expect(result.body.data.city).toBe("city test update");
        expect(result.body.data.province).toBe("province test update");
        expect(result.body.data.country).toBe("indonesia update");
        expect(result.body.data.postal_code).toBe("234234 update");
    });

    it("should reject if request is invalid", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
            .set("Authorization", "test")
            .send({
                street: "jalan test update",
                city: 'city test update',
                province: 'province test update',
                country: '',
                postal_code: '234234 update'
            });
            
        expect(result.status).toBe(400);
    });

    it("should reject if user is unauthorized", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
            .set("Authorization", "salah")
            .send({
                street: "jalan test update",
                city: 'city test update',
                province: 'province test update',
                country: 'indonesia update',
                postal_code: '234234 update'
            });
        
        expect(result.status).toBe(401);
    });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await createUserTest();
        await createTestContact();
        await createTestAddress();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContact();
        await removeTestUser();
    });

    it("should can delete address", async() => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
            .set("Authorization", "test");
        
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    });
});