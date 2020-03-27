const db = require('./../dbconfig');

getVendorById = (firebase_id) => {
    return db('vendor')
    .innerJoin('user', 'vendor.firebase_id', 'user.firebase_id')
    .select(
        'user.email',
        'user.firebase_id',
        'user.user_type',
        'user.first_name', 
        'user.last_name', 
        'user.street_address', 
        'user.city', 
        'user.state', 
        'user.zip', 
        'user.country',
        'user.phone_number', 
        'vendor.stripe_id', 
        'vendor.firebase_id')
    .where({ 'vendor.firebase_id': firebase_id })
    .first();
  };

addVendor = (vendor) => {
    return db('vendor').insert(vendor);
  }

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