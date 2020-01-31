const db = require("./../data/dbConfig");
const { fetchUserById, fetchUsers} = require('./userModels');

async function fetchTickets() {
  const ticket = await db("tickets");

  const arr = []
  const user = await fetchUsers();

  ticket.forEach((t) => {
     return user.map(u => (u.id === t.user_id) && arr.push({
       
          ticket_id: t.ticket_id,
          title: t.title,
          submitted_by: u.full_name,
          description: t.description,
          attempted_solution: t.attempted_solution,
          created_at: t.created_at,
          completed: t.completed,
          })
        )
  })

  return arr
}

async function fetchTicketsByUser(id) {

  const user = await db("user").where("id", id).first();
  const tickets = await db("tickets").where("user_id", id);

  return {
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    tickets
  };
}

async function addTicket(ticket) {
    const t = await db('tickets').insert(ticket);
    return db('tickets').where('title', ticket.title).first();
}
module.exports = {
  fetchTickets,
  fetchTicketsByUser,
  addTicket
};
