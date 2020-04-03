
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments();
        cart
        .string('firebase_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('customer')
        .unique();
        cart.decimal('total').unsigned().defaultTo(0.00);
        cart.integer('quantity').defaultTo(0);
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
