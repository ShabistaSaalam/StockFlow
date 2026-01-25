const orderService = require('../services/orderService')

exports.placeOrder = async (req, res) => {
  try {
    const result = await orderService.placeOrder(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
