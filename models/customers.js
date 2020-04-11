const db = require('./../dbconfig');

// getCustomerById = (firebase_id) => {;
//     return db('customer')
//     // .innerJoin('user', 'customer.firebase_id', 'user.firebase_id')
//     // .innerJoin('cart', 'customer.firebase_id', 'cart.firebase_id')
//         .select(
//         'customer.stripe_id', 
//         'user.email', 
//         'user.firebase_id', 
//         'user.first_name', 
//         'user.last_name', 
//         'user.user_type', 
//         'user.street_address', 
//         'user.city', 
//         'user.state', 
//         'user.zip', 
//         'user.country', 
//         'user.phone_number',)
//         .where({'customer.firebase_id': firebase_id })
//         .first();
//   };

getCustomerById = (firebase_id) => {
  return db('user')
  .innerJoin('customer', 'user.firebase_id', 'customer.firebase_id')
  .select(
    'customer.stripe_id', 
    'user.email', 
    'user.firebase_id', 
    'user.first_name', 
    'user.last_name', 
    'user.user_type', 
    'user.street_address', 
    'user.city', 
    'user.state', 
    'user.zip', 
    'user.country', 
    'user.phone_number',
    )
  .where({ 'user.firebase_id': firebase_id })
  .first();
};
  // async function addCustomer(firebase_id) {
  //   try {
  //      let addedCustomer = {
  //     firebase_id: firebase_id
  //   };
  //     const [id] = await db("customer")
  //       .insert(addedCustomer)
  //       .returning("id");
  //     return getCustomerById(id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async function addCustomer(firebase_id) {
    try {
       let addedCustomer = {
      firebase_id: firebase_id,
    };
      const [id] = await db('customer')
        .insert(addedCustomer)
        .returning('id');
      return getCustomerById(id);
    } catch (err) {
      console.log(err);
    }
  };

//   addCustomer = (firebase_id) => {
//     console.log(firebase_id, "from db")
//     return db('customer').insert(firebase_id)
// };
  module.exports = {
      getCustomerById,
      addCustomer,
  }