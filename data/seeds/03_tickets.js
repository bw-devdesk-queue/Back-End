exports.seed = async function(knex){
    await knex('tickets').insert([
        {
            title: 'First ticket',
            description: 'Some random tickets',
            attempted_solution: 'Just tried and tried and tried',
            completed: false,
            user_id: 1,
        },
    ]);
}

// exports.seed = async function(knex) {
//     await knex("tickets")
//       .del()
//       .then(function() {
//         return knex("tickets").insert([
//             {
//                 title: 'First ticket',
//                 description: 'Some random tickets',
//                 attempted_solution: 'Just tried and tried and tried',
//                 completed: false,
//                 user_id: 1,
//             }
//         ]);
//       });
//   };