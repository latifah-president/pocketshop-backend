
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          'firebase_id': '2435rwteray756ue57ghvders',
          'user_type': 'customer',
          'email': 'hokage7@theleaf.com',
          'first_name': 'Naruto',
          'last_name': 'Uzumaki',
          'street_address': '123 Main Street',
          'city': 'Chicago',
          'state': 'Illinoise',
          'zip': '12345',
          'country': 'USA',
          'phone_number': '123-321-3322'
        }, {
          'firebase_id': '34rweafrt32452awrerfaew',
          'user_type': 'customer',
          'email': 'tsunade_sama@leaf.com',
          'first_name': 'Tsunade',
          'last_name': 'Senju',
          'street_address': '123 Main Street',
          'city': 'Chicago',
          'state': 'Illinoise',
          'zip': '12345',
          'country': 'USA',
          'phone_number': '123-321-3322'
        }, {
          'firebase_id': '2435rwteray756ue5y5etrg',
          'user_type': 'vendor',
          'email': 'kakashi@leaf.com',
          'first_name': 'Kakashi',
          'last_name': 'Hatake',
          'street_address': '123 Main Street',
          'city': 'Chicago',
          'state': 'Illinoise',
          'zip': '12345',
          'country': 'USA',
          'phone_number': '123-321-3322'
        },  {
          'firebase_id': '2435rwteray756ue566ttuyyy',
          'user_type': 'vendor',
          'email': 'hiruzen_sarutobi@leaf.com',
          'first_name': 'Hiruzen',
          'last_name': 'Sarutobi',
          'street_address': '123 Main Street',
          'city': 'Chicago',
          'state': 'Illinoise',
          'zip': '12345',
          'country': 'USA',
          'phone_number': '123-321-3322'
        }
      ]);
    });
};

