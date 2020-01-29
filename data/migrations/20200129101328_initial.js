exports.up = async function(knex) {
    await knex.schema.createTable('user', tbl => {
       tbl.increments();
       tbl.string('full_name').notNullable();
       tbl.string('email').notNullable().unique();
       tbl.string('password').notNullable().unique();
    })
    await knex.schema.createTable('admin', tbl => {
        tbl.increments();
        tbl.string('full_name').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('password').notNullable().unique();
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('user');
    await knex.schema.dropTableIfExists('admin');
  };