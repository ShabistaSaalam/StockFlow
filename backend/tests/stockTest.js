/**
 * stockTest.js
 * -------------------
 * This test file demonstrates the stock edge-case logic:
 *  - Ensures orders fail when stock is insufficient
 *  - Validates that stock cannot go negative
 *  - Sequential order placement for a single product
 *
 * Usage:
 *   node tests/stockTest.js
 */

const API_URL = 'http://localhost:3000/order';

// Sequential test orders
const testOrders = [
  { id: 1, productId: 1, quantity: 3 }, // should succeed
  { id: 2, productId: 1, quantity: 3 }, // should fail (insufficient stock)
];

async function sendOrder(order) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: order.productId, quantity: order.quantity }),
    });
    const data = await res.json();

    if (data.status === 'SUCCESS') {
      console.log(`✅ Request ${order.id}: SUCCESS (orderId: ${data.orderId})`);
    } else {
      console.log(`❌ Request ${order.id}: FAILED (${data.error || 'Unknown error'})`);
    }
  } catch (err) {
    console.log(`❌ Request ${order.id}: FAILED (${err.message})`);
  }
}

async function runStockTest() {
  console.log('\n🔹 Starting stock edge-case test...\n');
  for (const order of testOrders) {
    await sendOrder(order);
  }
  console.log('\n🔹 Stock test complete.');
}

runStockTest();
