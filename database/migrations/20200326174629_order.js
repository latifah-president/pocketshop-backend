
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', order => {
        order.increments();
        // order
        // .string('vendor_id')
        // .unsigned()
        // .notNullable()
        // .references('firebase_id')
        // .inTable('vendor')
        // order.integer('product_id')
        // .unsigned()
        // .notNullable()
        // .references('id')
        // .inTable('product');
        // order.integer('customer_id')
        // .unsigned()
        // .notNullable()
        // .references('firebase_id')
        // .inTable('customer');
        order.float('order_total');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('order')
  };
