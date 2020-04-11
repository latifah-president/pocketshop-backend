const Customer = require('./../models/customers');
const Cart = require('./../models/cart');

exports.getCustomerById = async (req, res) => {
    try {
        const {firebase_id} = req.params;
        if (!firebase_id) {
            res.status(400).json(`Unable to find customer profile, check id`);
        } else {
            console.log(firebase_id,'user type and id')

            // const userData = await User.getUserById(firebase_id);
            const customerData = await Customer.getCustomerById(firebase_id)
            const customerCart = await Cart.getCustomerCart(firebase_id)
            const cartItem = await Cart.getCartItems(firebase_id)

            console.log(customerCart, 'bottom of await')
            res.status(200).json({customerData, cartItem, customerCart});
        }
    } catch(err) {
        res.status(500).json(`Error find customerr: ${err}`);
        console.log(`error from get customer by id: ${err}`)
    }
};

exports.getCartById = async (req, res, next) => {
    try {
        const id = req.params.id
        const cartItem = await Cart.getCartItems(id)
        
        console.log(cartItem.length, 'cart quanitity')
        let updatedTotal = 0
        const price = cartItem.forEach(element => {
            return updatedTotal += element.price 
        });
        const total = Math.ceil(updatedTotal * 100) / 100
        let quantity = cartItem.length;
        let updatedCart = {
            quantity,
            total
        }
       
        const cartTotal = await Cart.addTotal(updatedCart, id)
        res.status(200).json([cartItem])
        console.log(cartItem, 'cart type')
    } catch (err) {
        res.status(500).json(err)
        console.log(err, 'error from get cart')
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        //first get cartItems
        //loop through and if cartItems includes the product_id
        //increase the quantity
        const cart_id = req.params.id; //CART_ID IS THE FIREBASE_ID OF THE USER
        
        const {product_id, } = req.body;
        console.log(req.body, 'product from add to cart')
        const cartItems = await Cart.getCartItems(cart_id); //get uset caer

        let quantity = 1
        // console.log(quantity, 'cart quanitity')

       
        if (product_id) {
        // let updateQuantity = cartItems.includes(product_id)
        // let updateQuantity =  cartItems.find(
        //     function(el) {
        //         if (el.product_id === product_id){
        //             return true

        //         } else return
        //     }
        //   );
        // let updateQuantity = cartItems.find(item => {
        //     if( product_id === item.product_id) {
        //         quantity += 1
        //         console.log(quantity)
        //     }
           
        // })

        //     console.log("updated quantity " , updateQuantity)

        //     if (updateQuantity) {
        //         quantity += 1
        //         console.log("below new quantity:", quantity)
        //         const updatedCartItem = await Cart.updateCartItem(product_id, quantity)
        //     } else {
                const addedProducts = await Cart.addProductToCart(product_id, cart_id)
                console.log("Sucessful adding of product: one item in cart");
                res.status(201).json(`Product added`)
            //}
           


        } else {
            res.status(404).json(`Product not added`)
        }
       
      
        // if(cartItems.length == 0) {
        //         const addedStall = await Cart.addProductToCart(product_id, cart_id)
        //         console.log("Sucessful adding of stall: one item in cart");
        //         res.status(201).json(addedStall)
        // } else {
        //     console.log
        // }
        
    } catch (err) {
        res.status(500).json(`error adding item to cart`)
        console.log(err, 'error from add cart')
    }
}