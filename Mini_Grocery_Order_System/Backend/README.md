# Backend - Mini Grocery Order System (.NET)

This contains the **.NET backend** for the Mini Grocery Order System demo.

The backend handles all business logic for order placement, including:

- **Transaction-safe stock deduction**
- **Atomic order creation**
- **Stock validation and prevention of negative stock**
- **Strict API discipline (only 2 APIs allowed)**

---

## Folder Structure
```
Controllers/
├─ ProductsController.cs
├─ OrdersController.cs

Services/
├─ OrderService.cs

Repositories/
├─ ProductRepository.cs
├─ OrderRepository.cs
├─ IProductRepository.cs
├─ IOrderRepository.cs

Models/
├─ Product.cs
├─ Order.cs

Data/
├─ AppDbContext.cs

```

---

## Features

- **Only two APIs exposed**
  - `GET /products`
  - `POST /orders`
- Validates product existence
- Checks available stock
- Rejects order if stock is insufficient
- Deducts stock safely
- Creates order record
- All operations run inside **one database transaction**
- **Clean architecture**
  - Controllers handle HTTP only
  - Services handle business logic
  - Repositories handle database access

---

## API Flow

### GET /products
Returns the list of available products:
- Id
- Name
- Price
- Stock

### POST /orders
Handles complete order logic:
1. Validate product exists  
2. Check stock availability  
3. Reject if insufficient stock  
4. Deduct product stock  
5. Create order  
6. Commit transaction  

---

## Database Schema

### Product
- Id  
- Name  
- Price  
- Stock  

### Order
- Id  
- ProductId  
- Quantity  
- TotalPrice  
- CreatedAt  

---

## Business Logic
All business logic is implemented in the **Service layer**.  
Controllers do not contain any business logic.

---

## Transaction Safety
Order placement is executed inside a single database transaction to prevent:
- Negative stock
- Partial data writes
- Inconsistent order states

---

## Running the Backend

```bash
dotnet restore
dotnet run
```