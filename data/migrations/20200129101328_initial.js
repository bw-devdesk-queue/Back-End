exports.up = async function(knex) {
    await knex.schema.createTable('user', tbl => {
       tbl.increments();
       tbl.string('full_name').notNullable();
       tbl.string('email').notNullable().unique();
       tbl.string('role').notNullable();
       tbl.string('password').notNullable();
      })

      await knex.schema.createTable('admin', tbl => {
        tbl.increments();
        tbl.string('full_name').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('password').notNullable()
        tbl.string('role').notNullable();
    });

    await knex.schema.createTable('tickets', tbl => {
      tbl.increments('ticket_id');
      tbl.string('title').notNullable();
      tbl.string('description');
      tbl.string('attempted_solution') 
      tbl.timestamp('created_at', {precision: 6}).defaultTo(knex.fn.now());
      tbl.boolean('completed')
      tbl.integer('assigned_to')
      tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tickets');
    await knex.schema.dropTableIfExists('admin')
    await knex.schema.dropTableIfExists('user');
  };