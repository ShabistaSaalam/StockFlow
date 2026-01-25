/**
 * stressTest.js
 * -------------------
 * This test file demonstrates concurrency handling:
 *  - Sends multiple simultaneous requests to the /order API
 *  - Shows how overlapping transactions are safely rejected
 *  - Useful to demonstrate atomic stock deduction and concurrency control
 *
 * Usage:
 *   node tests/stressTest.js
 */

const API_URL = 'http://localhost:3000/order';

// Array of orders to send (productId 2, quantity 3)
const ordersToSend = [
  { id: 1, productId: 2, quantity: 3 },
  { id: 2, productId: 2, quantity: 3 },
  { id: 3, productId: 2, quantity: 3 },
  { id: 4, productId: 2, quantity: 3 },
  { id: 5, productId: 2, quantity: 3 },
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

async function runStressTest() {
  const promises = ordersToSend.map((order) => sendOrder(order));
  await Promise.all(promises);
  console.log('\n🔹 Stress test complete.');
}

runStressTest();
