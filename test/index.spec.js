const indexjs = require('./../index');
const superTest = require('supertest')

test('Should Test the app starts', async () => {
    const response = await superTest(indexjs).get('/')
    expect(response.status).toBe(200)
})
test('Should Test the app starts', async () => {
    const response = await superTest(indexjs).get('/');

    expect(response.status).toBe(200)
});

test('Should Test the app starts', async () => {
    const response = await superTest(indexjs).get('/')
    console.log(response.header)
    expect(response.text).toBe('Welcome to DevDesk / endpoint')
})
