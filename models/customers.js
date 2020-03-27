const db = require('./../dbconfig');

getCustomerById = (firebase_id) => {
    // const type = user.type;
    // const id = user.firebase_id;
    return db('customer')
    // .innerJoin('user', 'user.firebase_id', 'vendor.vendor_id')
        .select('customer.stripe_id')
        .where({ 'customer_id': firebase_id })
        .first();
  };


  addCustomer = (user) => {
    return db('user').insert(user)
};
  module.exports = {
      getCustomerById,
      addCustomer,
  }