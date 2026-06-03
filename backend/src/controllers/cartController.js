/*
        Fields:
            customerId:
            products:
                productId:
                quantity:
                subtotal:
            lastUpdated
            totalAmount:
            discountAmount:
            loyaltyPointsUsed: 
*/

import cartModel from "../models/cart.js";
import productsModel from "../models/products.js";

const cartController = {};

//Select
cartController.getAllCarts = async (req, res) => {
  try {
    //POPULATE
    //Populate is like a innner join in sql
    const carts = await cartModel
      .find()
      .populate("customerId", "name email phoneNumber") // This populates the customerId field in the cart documents with the name, email, pho fields from the Customers collection. It allows to retrieve the customer's name and email along with the cart information in a single query.
      .populate("products.productId", "name price"); // This populates the productId field in the products array of the cart documents with the name and price fields from the Products collection. It allows to retrieve the product's name and price along with the cart information in a single query.

    return res.status(200).json(carts);
  } catch (error) {
    console.error("Error obtaining the carts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//SELECT By id
cartController.getCartById = async (req, res) => {
  try {
    const cart = await cartModel
      .findById(req.params.id)
      .populate("customerId", "name email phoneNumber")
      .populate("products.productId", "name price");
    //.populate("customerId", "-password") The populate will exclude the password
    //.populate("customerId", "") //If the second field stays with "", the populate brings all the information

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error obtaining the carts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//INSERT A CART
cartController.createCart = async (req, res) => {
  try {
    //We use let to make validations on the fields later
    //#1 - Request the data
    let {
      customerId,
      products,
      lastUpdated,
      discountAmount,
      loyaltyPointsUsed,
    } = req.body; //We receive the products as an array of objects with productId and quantity, but we must calculate the subtotal for each product and the total for the cart before saving it in the DB.

    //////////////// Calculation of subtotal and total ///////////////

    //Variable to save the total of the cart
    let total = 0;

    //Array of products
    let newProducts = [];

    //For each product that the fronted send, iterate 1 by 1 to calculate the subtotal and total
    //We use a for loop because we need to make asynchronous calls to the database to get the price of each product, and forEach does not work well with asynchronous code.
    for (let i = 0; i < products.length; i++) {
      //Search the product in the database
      const productsFound = await productsModel.findById(products[i].productId); //products[i].productId is the id of the product that we receive from the frontend in the products array

      //Calculate the subtotal
      const subtotal = productsFound.price * products[i].quantity; //productsFound.price is the price of the product that we get from the database, and products[i].quantity is the quantity of the product that we receive from the frontend in the products array

      //Calculate the total
      total += subtotal;
      //total = total + subtotal

      //Save the product with the subtotal calculated
      newProducts.push({
        productId: products[i].productId, // We save the productId that we receive.
        quantity: products[i].quantity, // We save the quantity that we receive
        subtotal: subtotal, // We save the subtotal that we calculate
      });
    }

    //Discount amount
    if (discountAmount && discountAmount > total) {
      return res.status(400).json({
        message: `El descuento (${discountAmount}) no puede ser mayor que el total de los productos (${total}).`,
      });
    }

    // Aplicamos el descuento al total final
    const finalTotal = total - (discountAmount || 0);

    //////////////// End of the calculation of subtotal and total ///////////////

    //Create the new cart with the data received and the total calculated
    const newCart = new cartModel({
      customerId,
      products: newProducts, //We save the new products array with the subtotal calculated for each product
      totalAmount: finalTotal, //We save the total calculated for the cart
      lastUpdated,
      discountAmount: discountAmount || 0,
      loyaltyPointsUsed,
    });

    //#2 - Save the new cart in the DB
    await newCart.save();
    return res.status(201).json({ message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating the cart: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE A CART
cartController.updateCart = async (req, res) => {
  try {
    //#1- Request the data
    let {
      customerId,
      products,
      lastUpdated,
      discountAmount,
      loyaltyPointsUsed,
    } = req.body;

    ////////// Calculate the total and subtotal /////////
    let total = 0;

    let newProducts = [];

    for (let i = 0; i < products.length; i++) {

      const productsFound = await productsModel.findById(products[i].productId); // Search the product in the database to get the price and calculate the subtotal

      if (!productsFound) {
        return res
          .status(404)
          .json({
            message: `Product with ID ${products[i].productId} not found`,
          });
      }

      console.log(productsFound);

      //Calculate the subtotal
      const subtotal = productsFound.price * products[i].quantity; // productsFound.price is the price of the product that we get from the database, and products[i].quantity is the quantity of the product that we receive from the frontend in the products array

      //Calculate the total
      total += subtotal;
      //total = total + subtotal

      //Save the product with the subtotal calculated
      newProducts.push({
        productId: products[i].productId, // We save the productId that we receive.
        quantity: products[i].quantity, // We save the quantity that we receive
        subtotal: subtotal, // We save the subtotal that we calculate
      });
    }

    if (discountAmount && discountAmount > total) {
      return res.status(400).json({ 
        message: `El descuento (${discountAmount}) no puede ser mayor que el total de los productos (${total}).` 
      });
    }

    // Aplicamos el descuento al total final
    const finalTotal = total - (discountAmount || 0);

    //////////////// End of the calculation of subtotal and total ///////////////

    //Create the new cart updated with the data received and the total calculated
    const newCartUpdated = new cartModel({
      customerId,
      products: newProducts, //We save the new products array with the subtotal calculated for each product
      totalAmount: finalTotal, //We save the total calculated for the cart
      lastUpdated,
      discountAmount: discountAmount || 0,
      loyaltyPointsUsed,
    });

    cartModel.findByIdAndUpdate(
      req.params.id,
      newCartUpdated, //We send the new cart updated with the data received and the total calculated
      { new: true },
    );

    //If the cart is updated successfully, send a confirmation message
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating the cart: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE A CART
cartController.deleteCart = async (req, res) => {
  try {
    const deleted = await cartModel.findByIdAndDelete(req.params.id); //Search the cart by its id and delete it

    if (!deleted) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting the cart: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default cartController;
