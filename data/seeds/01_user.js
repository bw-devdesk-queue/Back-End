exports.seed = async function(knex){
   await knex('user').insert([
        {
          full_name: 'Lesley Fon',
          email: 'lesley@1.com',
          password: 'password1',
          role: 'user'
        }
      ]);
}