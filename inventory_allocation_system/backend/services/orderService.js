const orderRepo = require('../repositories/orderRepository')

exports.placeOrder = async (data) => {
  const { productId, quantity } = data

  if (!productId || !quantity || quantity <= 0) {
    throw new Error("Invalid order data")
  }

  return await orderRepo.placeOrderTransaction(productId, quantity)
}
