const db = require('../models/db')

exports.placeOrderTransaction = (productId, quantity) => {
  return new Promise((resolve, reject) => {
    // Do NOT use db.serialize + BEGIN TRANSACTION manually
    db.run("BEGIN IMMEDIATE TRANSACTION", (err) => {
      if (err) return reject(new Error("Database busy or another transaction is active"))

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

        if (this.changes === 0) {
          db.run("ROLLBACK")
          return reject(new Error("Product not found or insufficient stock"))
        }

        const insertOrder = `
          INSERT INTO orders (productId, quantity, status)
          VALUES (?, ?, ?)
        `

        db.run(insertOrder, [productId, quantity, "SUCCESS"], function (err) {
          if (err) {
            db.run("ROLLBACK")
            return reject(err)
          }

          db.run("COMMIT", (err) => {
            if (err) return reject(err)
            resolve({
              orderId: this.lastID,
              status: "SUCCESS"
            })
          })
        })
      })
    })
  })
}
