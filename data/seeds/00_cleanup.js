
exports.seed = async function(knex) {
  await knex('tickets').del();
  await knex('user').del();
  await knex('admin').truncate();

};
