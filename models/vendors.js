const db = require('./../dbconfig');

getVendorById = (firebase_id) => {
    return db('user')
    .innerJoin('vendor', 'user.firebase_id', 'vendor.firebase_id')
    .select(
      'vendor.stripe_id', 
      'vendor.vendor_name',
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
      'user.phone_number',)
    .where({ 'user.firebase_id': firebase_id })
    .first();
  };

// addVendor = (vendor) => {
//     return db('vendor').insert(vendor);
//   }

async function addVendor(firebase_id, vendor_name) {
  try {
     let addedVendor = {
    firebase_id: firebase_id,
    vendor_name: vendor_name
  };
    const [id] = await db('vendor')
      .insert(addedVendor)
      .returning('id');
    return getVendorById(id);
  } catch (err) {
    console.log(err);
  }
};
  updateVendor = (firebase_id, changes) => {
    return db('vendor').where({firebase_id: firebase_id}).update(changes);
  }

  deleteVendor = (id) => {
    return db('vendor').where({ id }).del()
}
  module.exports = {
      getVendorById,
      addVendor,
      updateVendor,
      deleteVendor
  }