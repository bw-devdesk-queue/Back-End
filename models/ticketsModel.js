const db = require("./../data/dbConfig");

function fetchTickets() {
  return db("tickets");
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
    console.log(t)
    return db('tickets').where('title', ticket.title).first();
}
module.exports = {
  fetchTickets,
  fetchTicketsByUser,
  addTicket
};
