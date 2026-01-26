# Backend - Inventory Allocation System

This contains the **Node.js backend** for the Inventory Allocation System demo.

The backend handles all business logic for order placement, including:

- **Transaction-safe atomic stock deduction**
- **Concurrency-safe order creation**
- **Stock validation and prevention of negative stock**
- **Single API usage (`POST /order`)** as per demo requirements

---

## Folder Structure

```
backend/
├─ controllers/ # Handles API requests
│ └─ orderController.js
├─ services/ # Business logic (order processing, stock deduction)
│ └─ orderService.js
├─ repositories/ # Database operations
│ └─ orderRepository.js
├─ models/ # DB models and initialization
│ ├─ db.js
│ └─ initDb.js
├─ routes/ # API routes
│ └─ orderRoutes.js
├─ tests/ # Stock and concurrency tests
│ ├─ stockTest.js
│ └─ stressTest.js
├─ server.js # Entry point for backend
├─ package.json
└─ package-lock.json
```

---

## Features

- **Single API:** `POST /order`
- Validates product existence
- Checks available stock
- Deducts stock safely
- Creates order with status
- Prevents negative stock
- Handles concurrent requests safely using transactions
- **Clean architecture:**  
- Controllers handle API requests  
- Services handle business logic  
- Repositories handle database operations

---

## Testing

- **Stock edge-case tests**: Verify correct handling of limited stock.
- **Concurrency/stress tests**: Simulate multiple simultaneous orders to ensure atomic stock deduction.
- Run tests:

```bash
node tests/stockTest.js
node tests/stressTest.js
```

# Backend - Inventory Allocation System

This contains the **Node.js backend** for the Inventory Allocation System demo.

The backend handles all business logic for order placement, including:

- **Transaction-safe atomic stock deduction**
- **Concurrency-safe order creation**
- **Stock validation and prevention of negative stock**
- **Single API usage (`POST /order`)** as per demo requirements

---

## Folder Structure

```
backend/
├─ controllers/ # Handles API requests
│ └─ orderController.js
├─ services/ # Business logic (order processing, stock deduction)
│ └─ orderService.js
├─ repositories/ # Database operations
│ └─ orderRepository.js
├─ models/ # DB models and initialization
│ ├─ db.js
│ └─ initDb.js
├─ routes/ # API routes
│ └─ orderRoutes.js
├─ tests/ # Stock and concurrency tests
│ ├─ stockTest.js
│ └─ stressTest.js
├─ server.js # Entry point for backend
├─ package.json
└─ package-lock.json
```

---

## Features

- **Single API:** `POST /order`
- Validates product existence
- Checks available stock
- Deducts stock safely
- Creates order with status
- Prevents negative stock
- Handles concurrent requests safely using transactions
- **Clean architecture:**  
- Controllers handle API requests  
- Services handle business logic  
- Repositories handle database operations

---

## Testing

- **Stock edge-case tests**: Verify correct handling of limited stock.
- **Concurrency/stress tests**: Simulate multiple simultaneous orders to ensure atomic stock deduction.
- Run tests:

```bash
node tests/stockTest.js
node tests/stressTest.js
```

---

## Running the Backend

```bash
cd backend
npm install
node server.js
```
