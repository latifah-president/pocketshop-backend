
exports.up = function(knex) {
  return knex.schema.createTable('user', user => {
      user.increments().primary();
      user.string('email').notNullable().unique();
      user.string('firebase_id').notNullable().unique();
      user.enu('user_type', ['market', 'vendor']);
      user.string('first_name');
      user.string('last_name');
      user.string('street_address');
      user.string('city');
      user.string('state');
      user.string('zip');
      user.string('country');
      user.string('phone_number');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
};
