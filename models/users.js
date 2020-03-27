const db = require('./../dbconfig');

getUsers = () => {
    return db('user').select(
      'firebase_id', 
      'email', 
      'user_type',
      'first_name', 
      'last_name', 
      'street_address',
      'city',
      'state',
      'zip',
      'country',
      'phone_number'
      )
};

getUsers = () => {
    return db('user').select(
      'firebase_id', 
      'email', 
      'user_type',
      'first_name', 
      'last_name', 
      'street_address',
      'city',
      'state',
      'zip',
      'country',
      'phone_number'
      )
};

getUserById = (firebase_id, user_type) => {
    //TODO: PASS USER TYPE AS AN ARG THEN INNER JOIN THAT USER TYPE TABLE
    //will have to pass user_type as a param /:id/:user_type
    // return db('user')
    //innerJoin(`${user_type}`, 'user.firebase_id', `${user_type}.firebase_id`)
    //.select('user.email', 'user.firebase_id', 'user.first_name', 'user.last_name', 'user.user_type', 'user.street_address', 'user.city', 'user.state', 'user.zip', 'user.country', 'user.phone_number', `${user_type}.firebase_id`, `${user_type}.stripe_id`)
    //.where({ 'firebase_id': firebase_id })
    //.first();
    return db('user')
        .innerJoin(`${user_type}`, 'user.firebase_id', `${user_type}.firebase_id`)
        .select(
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
            `${user_type}.firebase_id`, 
            `${user_type}.stripe_id`)
        .where({ 'user.firebase_id': firebase_id })
        .first();
  };

 
  addUser = (user) => {
    return db('user').insert(user)
};

updateUser = (firebase_id, changes) => {
    return db('user').where({firebase_id: firebase_id}).update(changes);
};

deleteUser = (id) => {
    return db('vendor').where({ id }).del()
}
  module.exports = {
      getUsers,
      getUserById,
      addUser,
      updateUser,
      deleteUser
  }