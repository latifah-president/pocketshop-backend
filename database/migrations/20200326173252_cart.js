
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments().primary();
        // cart
        // .string('firebase_id')
        // .unsigned()
        // .notNullable()
        // .references('firebase_id')
        // .inTable('customer')
        // .unique();
        cart.decimal('total').unsigned();
        cart.integer('quantity');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
