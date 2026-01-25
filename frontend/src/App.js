import { useState } from "react";
import './App.css';

function App() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  // Static product list for display only
  const products = [
    { id: 1, name: "Product ID: 1", stock: 5 },
    { id: 2, name: "Product ID: 2", stock: 10 },
    { id: 3, name: "Product ID: 3", stock: 7 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: Number(productId), quantity: Number(quantity) }),
      });

      const data = await res.json();
      if (data.error) setMessage(`❌ ${data.error}`);
      else setMessage(`✅ Order ${data.orderId} created, status: ${data.status}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Place Order</h1>

      <div className="product-box">
        <h3>Available Products</h3>
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} — Stock: {p.stock}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input value={productId} onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button type="submit">Place Order</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
