'use strict'

const supertest = require("supertest");
const assert = require("chai").assert;

const baseUrl = "https://petstore.swagger.io/v2";

describe('PetStore - User', () => {
    const req = supertest(baseUrl);

    it('POST new Users', () => {
        const user = require('../vendors/newUsers.json');
        return req
            .post('/user/createWithArray')
            .send(user)
            .then((res) => {
                assert.equal(res.statusCode, 200);
            });
    });

    it('Get User Login', () => {
        const username = 'arielcampos94';
        const password = '12345';
        const curl = `/user/login?username=${username}&password=${password}`;

        return req
            .get(curl)
            .then((res) => {
                assert.equal(res.body.code, 200);
                const message = res.body.message;
                const token = message.substring(message.indexOf(':') + 1,);
            }); 
    });
});
