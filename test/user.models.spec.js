const usermodels = require('./../models/userModels');
const bcrypt = require('bcryptjs');
const db = require('./../data/dbConfig')


beforeAll( async ()=>{
   await db.seed.run()
})

describe('Test User models', () => {
    it('Test that the fetchUser return an array of objects ',async () => {
        const users = await usermodels.fetchUsers();
        expect(Array.isArray(users)).toBe(true)
        expect(users.length).toBeGreaterThanOrEqual(1)
        expect(users).not.toBeFalsy();
    })
})

describe('Adding new Users to the db',  () => {
    test('Test Add user model', async () => {
        const reqBody = {
            full_name: "Jest Test",
            password: "password1",
            email: "jestTest@email.com",
            role: "user"
        }
        const user =  await usermodels.addUser(reqBody)
        expect(user).toBeTruthy()
        expect(reqBody.email).toEqual(user.email)
        expect(reqBody.role).toBe('user')
    })
    
})
