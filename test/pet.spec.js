const supertest = require("supertest");
const assert = require("chai").assert;

const urlBase = "https://petstore.swagger.io/v2";
const petId = 7894;
const req = supertest(urlBase);

describe('PetStore Swagger - PET', () => {
    const pets = require("../vendors/newPetN");

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

    it("GET pet", () => {
        return req
            .get(`/pet/${petId}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.name, "Chulo");
            });
    });
    
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

    it("DEL pet", () => {
        return req
            .del(`/pet/${petId}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
            });
    });

    
    // Função de carga de animais - Setup
    pets.array.forEach((pet => {
        let { nomePet, idPet, nomeCategoria, idCategoria } = pet;
        
        it(`Setup Swagger - Add pet`, () => {
            return req
                .post("/pet")
                .send({
                    "id": idPet,
                    "category": {
                        "id": idCategoria,
                        "name": nomeCategoria
                    },
                    "name": nomePet,
                    "tags": [
                        {
                            "name": "unvaccinated"
                        }
                    ],
                    "status": "available"
                })
                .then((res) => {
                    assert.equal(res.statusCode, 200);
                }); 
        });
    })); // Fim forEach

    it("GET pet", () => {
        return req
            .get(`/pet/108436`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.name, "Bola");
            });
    });
    
    // Função para deletar animais
    pets.array.forEach((pet => {
        let { idPet } = pet;

        it(`Setup Swagger - Del pet`, () => {
            return req
                .del(`/pet/${idPet}`)
                .then((res) => {
                    assert.equal(res.statusCode, 200);
                });
        });
    })); // Fim forEach

});
    
    
