
exports.up = function(knex) {
    return knex.schema.createTable('customer', vendor  => {
        vendor.increments().primary();
        vendor.string('customer_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
        vendor.string('stripeCustomerId');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customer')
};
