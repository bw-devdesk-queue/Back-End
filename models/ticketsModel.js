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

module.exports = {
  fetchTickets,
  fetchTicketsByUser
};
