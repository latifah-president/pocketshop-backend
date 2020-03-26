
exports.up = function(knex) {
    return knex.schema.createTable('vendor', vendor  => {
        vendor.increments().primary();
        vendor.string('vendor_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
        vendor.string('stripeAccountId');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vendor')
};
