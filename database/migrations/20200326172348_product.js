
exports.up = function(knex, Promise) {
    return knex.schema.createTable('product', product => {
      product.increments().primary();
      product.string('title').notNullable();
      product.string('description', 450).notNullable();
      product.float('price').notNullable();
      product.string('image_url', 250).notNullable();
      product.string('category').notNullable();
      // product
      //   .string('vendor_id')
      //   .unsigned()
      //   .notNullable()
      //   .references('firebase_id')
      //   .inTable('vendor')
      //   .onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('product');
  };
