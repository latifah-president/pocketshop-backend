
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', order => {
        order.increments().primary();
        order
        .string('Vendor_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('vendor')
        order.integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product');
        order.string('customer_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('customer');
        order.float('order_total');
        order.timestamp('created_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('order')
  };
