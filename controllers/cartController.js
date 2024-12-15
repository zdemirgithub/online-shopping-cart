const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    const productExists = cart.products.find(p => p.productId.toString() === productId);
    if (productExists) productExists.quantity += 1;
    else cart.products.push({ productId, quantity: 1 });
  } else {
    await Cart.create({ userId, products: [{ productId, quantity: 1 }] });
  }

  res.redirect('/cart');
};
