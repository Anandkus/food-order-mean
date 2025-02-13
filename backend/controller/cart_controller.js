const User = require("../models/user");
const adminDashboard = require("../models/admin-dashboard");

const addTocart = async (req, res) => {
  const { cartId } = req.body;
  const userid = req.user._id;

  try {
    const user = await User.findById(userid);

    // Check if the cartId already exists in the user's cart
    if (user.cartId.includes(cartId)) {
      return res.status(400).send({
        message: "This item is already in your cart!",
      });
    }

    // If the cartId does not exist, add it to the cart
    user.cartId.push(cartId);
    await user.save();

    return res.status(200).send({
      message: "Added to cart successfully!",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cartDetails = async (req, res) => {
  const userid = req.user._id;
  try {
    const user = await User.findById(userid).select('cartId').populate('cartId');

    // If the user or cartId is empty, return a message indicating the cart is empty
    if (!user || !user.cartId || user.cartId.length === 0) {
      return res.status(200).send({ message: "Cart is empty!" });
    }

    // Only return the cartId data (populated cart items)
    return res.status(200).send({
      message: "Get cart data successfully!",
      cart: user.cartId,  // Return just the populated cart items
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cartRemove = async (req, res) => {
  const cartId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    // Check if the cartId exists in the user's cart
    if (!user.cartId.includes(cartId)) {
      return res.status(400).send({
        message: "This item is not in your cart!",
      });
    }

    // Remove the cartId from the cart array
    user.cartId.pull(cartId); // Use pull to remove an item by its value

    // Save the updated user document
    await user.save();

    return res.status(200).send({
      message: "Item removed from cart successfully!",
    });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


module.exports = { addTocart, cartDetails, cartRemove }