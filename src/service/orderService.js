import mongoose from "mongoose";
import Address from "../model/address.js";
import Order from "../model/order.js";
import OrderItem from "../model/orderItem.js";
import User from "../model/User.js";
import OrderStatus from "../domain/OrderStatus.js";

class OrderService {

  async createOrder(user, shippingAddress, cart) {

    // Save address if not exists
    if (shippingAddress._id && !user.addresses.includes(shippingAddress._id)) {
      user.addresses.push(shippingAddress._id);
      await User.findByIdAndUpdate(user._id, user);
    }

    if (!shippingAddress._id) {
      shippingAddress = await Address.create(shippingAddress);
    }

    // Group items by seller
    const itemsBySeller = cart.cartItems.reduce((acc, item) => {
      const sellerId = item.product.seller._id.toString();
      acc[sellerId] = acc[sellerId] || [];
      acc[sellerId].push(item);
      return acc;
    }, {});

    const orders = new Set();

    for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {

      const totalOrderPrice = cartItems.reduce(
        (sum, item) => sum + item.sellingPrice,
        0
      );

      const totalItem = cartItems.length;

      const newOrder = new Order({
        user: user._id,
        seller: sellerId,
        shippingAddress: shippingAddress._id,
        orderItems: [],
        totalMrpPrice: totalOrderPrice,
        totalSellingPrice: totalOrderPrice,
        totalItem: totalItem,
        status: OrderStatus.PENDING
      });

      const orderItems = await Promise.all(
        cartItems.map(async (cartItem) => {
          const orderItem = new OrderItem({
            product: cartItem.product._id,
            quantity: cartItem.quantity,
            sellingPrice: cartItem.sellingPrice,
            mrpPrice: cartItem.mrpPrice,
            size: cartItem.size,
            userId: cartItem.userId
          });

          const savedOrderItem = await orderItem.save();
          newOrder.orderItems.push(savedOrderItem._id);

          return savedOrderItem;
        })
      );

      const savedOrder = await newOrder.save();
      orders.add(savedOrder);
    }

    return Array.from(orders);
  }

  async findOrderById(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid Order ID");
    }

    const order = await Order.findById(orderId).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async usersOrderHistory(userId) {
    return await Order.find({ user: userId }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);
  }

  async getSellersOrders(sellerId) {
    return await Order.find({ seller: sellerId })
      .sort({ orderDate: -1 })
      .populate([
        { path: "seller" },
        { path: "orderItems", populate: { path: "product" } },
        { path: "shippingAddress" }
      ]);
  }

  async updateOrderStatus(orderId, status) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid Order ID");
    }

    const order = await this.findOrderById(orderId);

    order.status = status;

    return await Order.findByIdAndUpdate(orderId, order, { new: true }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);
  }

  async cancelOrder(orderId, user) {
    const order = await this.findOrderById(orderId);

    if (user._id.toString() !== order.user.toString()) {
      throw new Error("You cannot cancel this order");
    }

    order.status = OrderStatus.CANCELLED;

    return await Order.findByIdAndUpdate(orderId, order, { new: true }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);
  }

  async findOrderItemById(orderItemId) {
    if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
      throw new Error("Invalid Order Item ID");
    }

    const orderItem = await OrderItem.findById(orderItemId).populate("product");

    if (!orderItem) {
      throw new Error("Order Item not found");
    }

    return orderItem;
  }
}

// ✅ IMPORTANT: export instance (NOT class)
export default new OrderService();