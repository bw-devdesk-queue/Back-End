const db = require('./../data/dbConfig');
const ticketModel = require('./../models/ticketsModel');


beforeEach(async ()=> {

    await db.seed.run()
})

describe('Test add model', () => {
    test('Add new ticket to the db', async ()=>{
     
        const tickets = await ticketModel.addTicket({
            title: 'Test ticket',
            description: 'Some test tickets',
            attempted_solution: 'Just tried and tried and tried and tested',
            completed: false,
            user_id: 1,
        })
        const allTickets = await ticketModel.fetchTickets();

        expect(allTickets).toHaveLength(2)
        expect(allTickets[1].title).toBe('Test ticket')
        expect(allTickets[1].completed).toBeFalsy();
        expect(allTickets[1]).toHaveProperty('description', 'Some test tickets');
    })
});


describe('Test Delete model', ()=> {
    it('Delete tickets from the db', async ()=>{
        const allTickets = await ticketModel.fetchTickets();
        const id = await ticketModel.deleteTicket(2);
        console.log(allTickets)
        expect(allTickets).toHaveLength(1)
        expect(allTickets[2]).toBeUndefined()
    })
})
