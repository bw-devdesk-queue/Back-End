const index = require('./../index');
const app = require('supertest');
const userModels = require('./../models//userModels');
const db = require('./../data/dbConfig')

beforeEach( ()=>  db.seed.run())
describe('Test Register route',  () => {
    test('should Test the user register endpoint', async () => {
        const res = await app(index).post('/auth/user/register').send({
            full_name: "user",
            password: "user",
            email: "user@email.com",
            role: "user",
        });
        const thisUser = await db('user').where("email", "user@email.com").first();
        expect(res.status).toBe(201)
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.data.user.password).toBeUndefined();
        expect(res.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(res.body.data.message).toEqual('Successfully created a new user');
        expect(thisUser.password).not.toBe('user');

    });

    test('should Test when any of the properties isnt defined', async () => {
        const res = await app(index).post('/auth/user/register').send({});
        console.log(res.text)
        expect(res.status).toEqual(404)
    })
    
    
})









