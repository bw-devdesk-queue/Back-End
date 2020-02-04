const db = require("./../data/dbConfig");
const { fetchUserById, fetchUsers } = require("./userModels");

async function fetchTickets() {
  const ticket = await db("tickets");
  const arr = [];
  const user = await fetchUsers();

  //map through the ticket array
  ticket.forEach(t => {
    //map through the user array
    return user.map(
      u =>
        // if ticket.user_id is equal to the user.id them we push into the arr created 
        u.id === t.user_id &&
        arr.push({
          ticket_id: t.ticket_id,
          title: t.title,
          submitted_by: u.full_name,
          description: t.description,
          attempted_solution: t.attempted_solution,
          assigned_to: t.assigned_to,
          created_at: t.created_at,
          completed: t.completed
        })
    );
  });

  return arr;
}

async function fetchTicketsByUser(id) {
  const user = await db("user")
    .where("id", id)
    .first();
  const tickets = await db("tickets").where("user_id", id);

  return {
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    tickets
  };
}

async function addTicket(ticket) {
  const t = await db("tickets").insert(ticket);
  return db("tickets")
    .where("title", ticket.title)
    .first();
}

async function updateTicket(ticket_id, ticket){

  return db('tickets').update(ticket).where('ticket_id', ticket_id).returning('*')
}


function deleteTicket(id){
  return db('tickets').where('ticket_id', id).del();
}
module.exports = {
  fetchTickets,
  fetchTicketsByUser,
  addTicket,
  updateTicket,
  deleteTicket
};
