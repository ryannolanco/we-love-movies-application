
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable();
    table
    .foreign("movie_id")
    .references("movie_id")
    .inTable("movies")
    .onDelete("cascade");
    table.integer("theater_id").unsigned().notNullable();
    table
    .foreign("theater_id")
    .references("theater_id")
    .inTable("theaters")
    .onDelete("cascade")
    table.boolean("is_showing").defaultTo(false).notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters")
};
