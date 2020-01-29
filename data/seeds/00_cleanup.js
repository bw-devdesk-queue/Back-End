
exports.seed = async function(knex) {
  await knex('user').truncate();
  await knex('admin').truncate();

};
