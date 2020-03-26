
const faker = require('faker');

exports.seed = function(knex) {
  createFakeProducts = (i) => {
    const vendorid = i % 2 ? '2435rwteray756ue5y5etrg' : '2435rwteray756ue566ttuyyy';

    return {
      title: faker.commerce.productName(),
      description: faker.commerce.product(),
      price: faker.finance.amount(),
      image_url: faker.image.fashion(),
      category: faker.commerce.department(),
      // vendor_id: vendorid
    }
  }

  const products = [];
  const numOfFakes = 50;

  for (let i = 0; i < numOfFakes; i++) {
    products.push(createFakeProducts(i))
  }

  return (
    knex('product')
      .then(function() {
        return knex('product').insert(products)
      })
  )
};
