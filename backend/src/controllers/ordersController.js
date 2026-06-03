import ordersModel from "../models/orders.js";
import cartModel from "../models/cart.js";

const ordersController = {};

// Get all orders
ordersController.getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel
      .find()
      .populate({ path: "cartId", populate: { path: "customerId", select: "name email phoneNumber" } })
      .populate({ path: "cartId", populate: { path: "products.productId", select: "name price" } });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error obtaining the orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get order by id
ordersController.getOrderById = async (req, res) => {
  try {
    const order = await ordersModel
      .findById(req.params.id)
      .populate({ path: "cartId", populate: { path: "customerId", select: "name email phoneNumber" } })
      .populate({ path: "cartId", populate: { path: "products.productId", select: "name price" } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error obtaining the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create an order
ordersController.createOrder = async (req, res) => {
  try {
    const { cartId, address, orderStatus, orderDate, payment } = req.body;

    // Validate cart existence
    if (!cartId) {
      return res.status(400).json({ message: "cartId is required" });
    }

    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: `Cart with ID ${cartId} not found` });
    }

    // Basic address validation: must be an array with at least one address object
    if (!address || !Array.isArray(address) || address.length === 0) {
      return res.status(400).json({ message: "address must be a non-empty array" });
    }

    // Payment validation: optional but if provided must be array
    if (payment && !Array.isArray(payment)) {
      return res.status(400).json({ message: "payment must be an array if provided" });
    }

    const newOrder = new ordersModel({
      cartId,
      address,
      orderStatus: orderStatus || "pending",
      orderDate: orderDate || new Date(),
      payment: payment || [],
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an order
ordersController.updateOrder = async (req, res) => {
  try {
    const { cartId, address, orderStatus, orderDate, payment } = req.body;

    // If cartId is provided, validate it
    if (cartId) {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        return res.status(404).json({ message: `Cart with ID ${cartId} not found` });
      }
    }

    // Validate address if present
    if (address && (!Array.isArray(address) || address.length === 0)) {
      return res.status(400).json({ message: "address must be a non-empty array" });
    }

    if (payment && !Array.isArray(payment)) {
      return res.status(400).json({ message: "payment must be an array if provided" });
    }

    const update = {};
    if (cartId) update.cartId = cartId;
    if (address) update.address = address;
    if (orderStatus) update.orderStatus = orderStatus;
    if (orderDate) update.orderDate = orderDate;
    if (payment) update.payment = payment;

    const updated = await ordersModel.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an order
ordersController.deleteOrder = async (req, res) => {
  try {
    const deleted = await ordersModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default ordersController;
