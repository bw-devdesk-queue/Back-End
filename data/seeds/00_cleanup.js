
const cleaner = require('knex-cleaner');
exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};



// exports.seed = async function(knex) {
//   await knex('tickets').truncate();
//   await knex('admin').truncate();
//   await knex('user').truncate();
// };

