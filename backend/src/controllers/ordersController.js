import ordersModel from "../models/orders.js";
import cartModel from "../models/cart.js";
import productsModel from "../models/products.js";

const ordersController = {};

// Gives the stock of every product in a cart back to the inventory (used when an order is cancelled).
const restockCart = async (cart) => {
  for (const line of cart.products) {
    await productsModel.findByIdAndUpdate(line.productId, { $inc: { stock: line.quantity } });
  }
};

// Cancel an order (customer): only the owner can cancel it, while it is pending or in process
ordersController.cancelOrder = async (req, res) => {
  try {
    const order = await ordersModel.findById(req.params.id).populate("cartId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.cartId?.customerId?.toString() !== req.customer.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
    
    // Permitir cancelación tanto para estado 'pending' como 'in_process' / 'processing'
    const estadosCancelables = ["pending", "in_process", "processing", "in_progress"];
    if (!estadosCancelables.includes(order.orderStatus)) {
      return res.status(400).json({ message: "Solo se pueden cancelar pedidos pendientes o en proceso" });
    }

    order.cartId = order.cartId._id;
    const { error } = await cancelOrderAndRestock(order);
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    // A customer may only look up their own orders
    if (order.cartId?.customerId?._id?.toString() !== req.customer.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error obtaining the order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the order history of a given customer
ordersController.getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // A customer may only look up their own order history
    if (customerId !== req.customer.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const customerCarts = await cartModel.find({ customerId }).select("_id");
    const cartIds = customerCarts.map((c) => c._id);

    const orders = await ordersModel
      .find({ cartId: { $in: cartIds } })
      .sort({ orderDate: -1 })
      .populate({ path: "cartId", populate: { path: "products.productId", select: "name price images" } });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error obtaining the customer's orders:", error);
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

    // A customer may only check out their own cart
    if (cart.customerId?.toString() !== req.customer.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    // Basic address validation: must be an array with at least one address object
    if (!address || !Array.isArray(address) || address.length === 0) {
      return res.status(400).json({ message: "address must be a non-empty array" });
    }

    // Payment validation: optional but if provided must be array
    if (payment && !Array.isArray(payment)) {
      return res.status(400).json({ message: "payment must be an array if provided" });
    }

    if (!cart.products?.length) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    // A cart can only become one order (otherwise stock would be discounted twice)
    const existingOrder = await ordersModel.findOne({ cartId });
    if (existingOrder) {
      return res.status(400).json({ message: "Este carrito ya tiene un pedido" });
    }

    // Final stock check right before discounting it
    for (const line of cart.products) {
      const product = await productsModel.findById(line.productId);
      if (!product) {
        return res.status(404).json({ message: "Uno de los productos ya no existe" });
      }
      if (line.quantity > product.stock) {
        const message =
          product.stock > 0
            ? `Solo hay ${product.stock} unidades disponibles de "${product.name}".`
            : `"${product.name}" está agotado.`;
        return res.status(400).json({ message });
      }
    }

    const newOrder = new ordersModel({
      cartId,
      address,
      orderStatus: orderStatus || "pending",
      orderDate: orderDate || new Date(),
      payment: payment || [],
    });

    await newOrder.save();

    // Discount the purchased units from the stock
    for (const line of cart.products) {
      await productsModel.findByIdAndUpdate(line.productId, { $inc: { stock: -line.quantity } });
    }

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

    // Cancelling an order returns its products to the stock
    if (orderStatus === "cancelled") {
      const order = await ordersModel.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const { error } = await cancelOrderAndRestock(order);
      if (error) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(200).json({ message: "Order cancelled successfully" });
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

// Cancel an order (customer): only the owner can cancel it, and only while it is pending
ordersController.cancelOrder = async (req, res) => {
  try {
    const order = await ordersModel.findById(req.params.id).populate("cartId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.cartId?.customerId?.toString() !== req.customer.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
    if (order.orderStatus !== "pending") {
      return res.status(400).json({ message: "Solo se pueden cancelar pedidos pendientes" });
    }
    order.cartId = order.cartId._id;
    const { error } = await cancelOrderAndRestock(order);
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling the order:", error);
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
