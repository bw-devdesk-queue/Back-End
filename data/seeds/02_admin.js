exports.seed = async function(knex){
    await knex('admin').insert([
        {
          full_name: 'Bakayoko',
          email: 'baka@1.com',
          password: 'password1',
          role: 'admin'
        }
      ]);
}

// exports.seed = async function(knex) {
//   await knex("admin")
//     .del()
//     .then(function() {
//       return knex("admin").insert([
//         {
//           full_name: 'Bakayoko',
//           email: 'baka@1.com',
//           password: 'password1',
//           role: 'admin'
//         }
//       ]);
//     });
// };