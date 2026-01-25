# Inventory System - React Frontend

## Overview
This is the **React frontend** for the Inventory Allocation System.  
It provides a simple form to place orders using the **single backend API** (`POST /order`).

> Note: This frontend is minimal and only for demo purposes. It shows products as a reference and allows submitting orders. Business logic (stock validation, deduction) is handled **only in the backend**, per task requirements.

---

## Features
- Place an order by providing:
  - **Product ID**
  - **Quantity**
- Shows success/failure messages after submitting.
- Minimal CSS styling for readability.
- Demo box showing products and their available count (static, for reference).

---

## Usage

1. Make sure the backend server is running at `http://localhost:3000`.
2. Start the React frontend:

```bash
cd frontend
npm install
npm start
```

3. Open `http://localhost:3001` (or the port shown) in your browser.

4. Enter Product ID and Quantity, then click Place Order.