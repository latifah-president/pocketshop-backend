const db = require('./../dbconfig');

getCart = () => {
  return db('cart').select('cart.id', 'cart.firebase_id');
};

getCartById = id => {
    return db('cart')
      .where({ firebase_id: id })
      .first();
  };

  getCustomerCart = id => {
    return db('cart').innerJoin('user', 'cart.firebase_id', 'user.firebase_id').select('cart.quantity', 'cart.total').where({ 'cart.firebase_id': id });
  };


  async function addCart(firebase_id) {
    try {
       let addedCart = {
      firebase_id: firebase_id
    };
      const [id] = await db("cart")
        .insert(addedCart)
        .returning("id");
      return getCartById(id);
    } catch (err) {
      console.log(err);
    }
  };

  getCartItems = id => {
    return db('cart_item')
      .innerJoin('product', 'cart_item.product_id', 'product.id')
      .innerJoin('vendor', 'product.vendor_id', 'vendor.firebase_id')
      .innerJoin('cart', 'cart_item.cart_id', 'cart.firebase_id')
      .select([
        'cart_item.id',
        'product_id',
        'product.title',
        'product.description',
        'product.price',
        'product.image_url',
        'product.category',
        'product.vendor_id',
        'cart.firebase_id',
        'cart.firebase_id',
        'vendor.stripe_id',
        'cart_item.quantity',
        'cart.total'
      ])
      .where({ cart_id: id });
  };

  addProductToCart = (product_id, cart_id) => {
    let addedItem = {
      product_id,
      cart_id
    };
    console.log('added item from model', addedItem);
    return db('cart_item').insert(addedItem);
  };

  addTotal = (updatedCart, firebase_id) => {
    let cart = {
      ...updatedCart,
     
    }
    return db('cart').insert(cart)
  }
module.exports = {
    getCart,
    getCartById,
    getCustomerCart,
    getCartItems,
    addCart,
    addProductToCart,
    addTotal,
}