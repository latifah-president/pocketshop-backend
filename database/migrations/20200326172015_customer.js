
exports.up = function(knex) {
    return knex.schema.createTable('customer', vendor  => {
        vendor.increments();
        vendor.string('customer_id')
            .primary()
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
        vendor.string('stripe_id'); //might have to chnage this back to stripeCustomerId
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customer')
};
