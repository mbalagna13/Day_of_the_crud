
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('streams', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('url').notNullable();
    table.boolean('sub_status').notNullable();
    table.integer('follwers').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('streams');
};
