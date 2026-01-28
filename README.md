# StockFlow — Assignment Submission

This repository contains the complete **assignment submission**, organized into two independent demo tasks.  
Each task focuses on **backend architecture, API discipline, and business logic ownership**, with minimal frontend implementations for demonstration purposes.

---

## Demo Tasks Included

### 1. Mini Grocery Order System (Demo Task 1)
A full-stack system built to demonstrate:
- Clean layered backend architecture
- Strict API discipline (only 2 APIs allowed)
- Transaction-safe stock handling and order creation
- Minimal Ionic + Angular frontend for interaction

**Tech Stack**
- Backend: .NET
- Frontend: Ionic + Angular

📁 Folder: `mini-grocery-order-system/`  
📄 Docs: `mini-grocery-order-system/README.md`

---

### 2. Inventory Allocation System (Demo Task 2)
A backend-focused system designed to test:
- Single API orchestration (`POST /order`)
- Concurrency-safe stock deduction
- Atomic transactions under parallel requests
- Minimal React and Flutter frontends using the same API

**Tech Stack**
- Backend: Node.js
- Frontend: React, Flutter

📁 Folder: `inventory-allocation-system/`  
📄 Docs: `inventory-allocation-system/README.md`

---

## Repository Structure

```
mini-grocery-order-system/ # Demo Task 1
inventory-allocation-system/ # Demo Task 2
```

---

## How to Use

Each demo task is **self-contained** and includes:
- Its own backend and frontend
- A dedicated README with:
  - Folder structure
  - API flow
  - Business logic explanation
  - Run instructions

Please navigate into the respective task folder to get started.

---

## Notes for Reviewers

- Business logic is strictly implemented in the **Service layer** for both tasks.
- Controllers handle **request/response only**.
- All stock updates and order creation are **atomic and transaction-safe**.
- API discipline rules defined in the assignment are strictly followed.
- Commit history reflects **incremental development and architectural decisions**.

---

## Submission

This repository is submitted as part of the technical assignment to demonstrate:
- Backend responsibility ownership
- Clean system design
- Transaction handling and concurrency awareness
- API discipline and architectural clarity
