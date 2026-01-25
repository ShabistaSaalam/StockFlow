const db = require('../models/db')

exports.placeOrderTransaction = (productId, quantity) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION")

      // Atomic stock deduction
      const updateQuery = `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ? AND stock >= ?
      `

      db.run(updateQuery, [quantity, productId, quantity], function (err) {
        if (err) {
          db.run("ROLLBACK")
          return reject(err)
        }

        // If no rows updated, product doesn't exist or stock insufficient
        if (this.changes === 0) {
          db.run("ROLLBACK")
          return reject(new Error("Product not found or insufficient stock"))
        }

        // Create order
        const insertOrder = `
          INSERT INTO orders (productId, quantity, status)
          VALUES (?, ?, ?)
        `

        db.run(insertOrder, [productId, quantity, "SUCCESS"], function (err) {
          if (err) {
            db.run("ROLLBACK")
            return reject(err)
          }

          db.run("COMMIT")
          resolve({
            orderId: this.lastID,
            status: "SUCCESS"
          })
        })
      })
    })
  })
}
