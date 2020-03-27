const User = require('./../models/users');
const Vendor = require('./../models/vendors');


exports.getUsers = async (req, res) => {
    try {
        const users = req.body;
        if (users) {
            const usersData = await User.getUsers();
            console.log('req.body:' ,req.body)
            res.status(200).json(usersData);
        } else {
            res.status(400).json(`Unable to find users`);
        }
    } catch(err) {
        res.status(500).json(`Erorr getting users: ${err}`);
        console.log(`error from getUsers: ${err}`)
    }
};

exports.getUserById = async (req, res) => {
    try {
        const {firebase_id, user_type} = req.params;
        if (!firebase_id) {
            res.status(400).json(`Unable to find user, check id and user type`);
        } else {

            const userData = await User.getUserById(firebase_id, user_type);
            console.log(req.params, 'bottom of await')
            res.status(200).json(userData);
        } 
    } catch(err) {
        res.status(500).json(`Error find user: ${err}`);
        console.log(`error from get user by id: ${err}`)
    }
};

exports.addUser = async (req, res) => {
    try {
        
        const {email, user_type, firebase_id, first_name, last_name, street_address, city, state, zip, country, phone_number} = req.body;
        if (!email || !firebase_id || !user_type || !first_name || !last_name || !street_address || !city || !state || !zip || !country || !phone_number  ) {
            res.status(400).json(`Please enter all input fields`);

        } else {
            console.log(firebase_id, 'req.body for register')

            const newUser = await User.addUser(req.body);
            // const newVendor = await Vendor.addVendor(req.body.firebase_id)
            // const cart = await Cart.addCart(firebase_id);
            res.status(201).json(`Welcome ${first_name}`);
        // }
    } }catch(err) {
        res.status(500).json(`There was an error adding you information`);
        console.log(`error from addUser: ${err}`)
    }
};

exports.updateUser = async (req, res) => {
    try {
      const changes = req.body;
      const {firebase_id} = req.params;
      if (!changes || !firebase_id) {
          res.status(404).json(`Profile information was not updated`);
      } else {
          const user = await User.updateUser(firebase_id, changes);
          res.status(200).json(`Profile successfully updated`);
      }
    } catch (err) {
      res.status(500).json(`error updating vendor: ${err}`);
        console.log(err, 'edit user error')
    }
};

exports.deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
      if (!id) {
        res.status(404).json({ errorMessage: 'No user selected' });
      } else {
        const user = await User.deleteUser(id);
        res.status(204).json('User sucessfully deleted')
      }
    } catch (err) {
      res.status(500).json(`Cannot delete product: ${err}`);
      console.log(err);
    }
  };