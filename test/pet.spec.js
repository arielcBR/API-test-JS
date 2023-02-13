const supertest = require("supertest");
const assert = require("chai").assert;

const urlBase = "https://petstore.swagger.io/v2";
const petId = 7894;
const req = supertest(urlBase);

describe('PetStore Swagger - PET', () => {
    it("POST pet", () => {
        const jsonFile = require('../vendors/pet.json');
        return req
            .post("/pet")
            .send(jsonFile)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.id, petId);
                assert.equal(res.body.name, "Chulo");
            });
    });
});

describe('PetStore Swagger - PET', () => { 
    it("GET pet", () => {
        return req
            .get(`/pet/${petId}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.name, "Chulo");
            });
    });
});

describe("PetStore Swagger - PET", () => {
    it("PUT pet", () => {
        const jsonFileUpdated = require("../vendors/petUpdate.json");
        return req
            .put("/pet")
            .send(jsonFileUpdated)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.status, "unavailable");
                assert.equal(res.body.tags[0].name, "vaccinated");
                assert.equal(res.body.tags[1].name, "castrated");
            });
    });
});

describe("PetStore Swagger - PET", () => {
    it("DEL pet", () => {
        return req
            .del(`/pet/${petId}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
            });
    });
});


