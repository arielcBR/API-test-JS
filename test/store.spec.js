// https://petstore.swagger.io/#/store

const supertest = require("supertest");
const assert = require("chai").assert;

describe("/store", () => {
    const req = supertest("https://petstore.swagger.io/v2");
    
    it("POST a new order", () => {
        const req = supertest("https://petstore.swagger.io/v2");
        const newOrder = require("../vendors/newPet.json");

        return req
            .post("/store/order")
            .send(newOrder)
            .then(res => {
                assert.equal(res.statusCode, 200)
            })
    })
    
    it("GET an order", () => {
        const id = 2;

        return req  
            .get("/store/order/" + id)
            .then(res => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.petId, 2307);
                assert.equal(res.body.status, "placed");
            })
    })

    it("DELETE an order", () => {
        const id = 2;
        
        return req  
            .delete("/store/order/" + id)
            .then(res => {
                assert.equal(res.statusCode, 200)
            })
    })
})
