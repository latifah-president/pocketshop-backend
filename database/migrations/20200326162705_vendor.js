
exports.up = function(knex) {
    return knex.schema.createTable('vendor', vendor  => {
        vendor.increments();
        vendor.string('firebase_id')
            .primary()
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
        vendor.string('stripe_id'); //might have to change this back to stripeAccountId
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vendor')
};
