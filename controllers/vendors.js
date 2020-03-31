const Vendor = require('./../models/vendors');
const User = require('./../models/users');


//separate registration for vendor. 
//on frontend onClick to register market new market will be directed to strip express setup
//useEffect to update stripe_id for vendor

//1. vendor registers at /vendor/register this will allow us to set the user type automatically
//2. vendor clicks continue button on vendor registration form and will be directed to the stripe express on boarding screen if our  
// res.status to /vendor/register  === 201
//3. once on boarding is completed we now have our stripe_id for the vendor
//4. stripe will redirect us to our profile route vendor/:id
//5. in a use effect call /vendor/addVendor, {stripe_id: stripAccountId} to update the vendor table with the stripe id we got from on boarding
// if res.status to /vendor/addVendor === 201 call /vendor/:id
exports.getVendorById = async (req, res) => {
    try {
        const {firebase_id} = req.params;
        if (!firebase_id) {
            res.status(400).json(`Unable to find vendor, check id`);
        } else {
            console.log(firebase_id,'user type and id')

            // const userData = await User.getUserById(firebase_id);
            const vendorData = await Vendor.getVendorById(firebase_id)
            console.log(vendorData, 'bottom of await')
            res.status(200).json(vendorData);
        }
    } catch(err) {
        res.status(500).json(`Error find vendor: ${err}`);
        console.log(`error from get vendor by id: ${err}`)
    }
};

exports.addVendor = async (req, res) => {
    try {
    //     const {email, user_type, firebase_id, first_name, last_name, street_address, city, state, zip, country, phone_number} = req.body;
    //     if (!email || !firebase_id || !user_type || !first_name || !last_name || !street_address || !city || !state || !zip || !country || !phone_number  ) {
    //         res.status(400).json(`Please enter all input fields`);
    //         console.log(req.body, 'req.body for register')

    //     } else {
    //         const newUser = await Vendor.addVendor(req.body);
    //         // const newVendor = await Vendor.addVendor(firebase_id);
    //         // const cart = await Cart.addCart(firebase_id);
    //         res.status(201).json(`Welcome ${first_name}`);
    //         console.log(newUser)
    //     // }
    // }
      const vendor = req.body;
      // console.log(newVendor);
      if (vendor) {
        const newVendor = await Vendor.addVendor(vendor);
        // const cart = await Cart.addCart(id)
        console.log(vendor, 'vendor id')
        // console.log(cart)
        res.status(201).json(`A vendor has been added`);
      } else {
        res.status(400).json({ message: "Must enter all input fields" });
      }
    } catch (error) {
      res.status(500).json({
        error: `There was an error while adding vendor to the database: ${error}`,
       
      });
      console.log(error, 'add vendor error')
    }
  };

  exports.updateVendor = async (req, res) => {
      try {
        const changes = req.body;
        const {firebase_id} = req.params;
        if (!changes || !firebase_id) {
            res.status(404).json(`Vendor information was not updated`);
        } else {
            const vendor = await Vendor.updateVendor(firebase_id, changes);

            console.log(vendor)
            res.status(200).json(vendor);
        }
      } catch (err) {
        res.status(500).json(`error updating vendor: ${err}`);
          console.log(err, 'edit vendor error')
      }
  };

  exports.deleteVendor = async (req, res) => {
    try {
      const {id} = req.params;
      if (!id) {
        res.status(404).json({ errorMessage: 'No vendor selected' });
      } else {
        const vendor = await Vendor.deleteVendor(id);
        res.status(204).json('Vendor sucessfully deleted')
      }
    } catch (err) {
      res.status(500).json(`Cannot delete product: ${err}`);
      console.log(err);
    }
  };