
exports.up = function(knex) {
    return knex.schema.createTable('vendor', vendor  => {
        vendor.increments();
        vendor.string('firebase_id')
            .unsigned()
            .unique()
            .notNullable()
            .references('firebase_id')
            .inTable('user')
            .onUpdate('CASCADE');
        vendor.string('stripe_id'); //might have to change this back to stripeAccountId
        vendor.string('vendor_name').unique();
        vendor.string('logo_url');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vendor')
};
