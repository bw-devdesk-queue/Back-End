const usermodels = require('./../models/userModels')
const db = require('./../data/dbConfig')


beforeEach(async ()=>{
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

describe('Test Add user model', () => {
    
})

