
exports.up = function(knex) {
    return knex.schema.createTable('customer', customer  => {
        customer.increments();
        customer.string('firebase_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
       customer.string('stripe_id'); //might have to chnage this back to stripeCustomerId
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customer')
};
