# Frontend - Mini Grocery Order System (Ionic + Angular)

This contains the **Ionic + Angular frontend** for the Mini Grocery Order System demo.

The frontend provides a minimal interface to interact with the backend APIs and strictly avoids handling any business logic.

---

## Folder Structure

```
src/
├─ app/
│ ├─ home/
│ │ ├─ home.page.html
│ │ ├─ home.page.scss
│ │ ├─ home.page.ts
│ ├─ app.component.html
│ ├─ app.component.scss
│ ├─ app.component.ts
│ ├─ app.routes.ts
│ ├─ order.service.ts
│ ├─ product.service.ts
│ └─ product.ts
├─ assets/
├─ environments/
├─ theme/
└─ main.ts
```

---

## Features

- Lists products using `GET /products`
- Places orders using `POST /orders`
- Displays success and failure messages
- Uses Angular services for API communication

---

## API Usage

### GET /products
Fetches and displays available products:
- Id
- Name
- Price
- Stock

### POST /orders
Sends order requests to backend:
- ProductId
- Quantity

All validation and stock handling is performed by the backend.

---

## Architecture

- **Pages**
  - `home.page.ts` — UI logic and user interaction
- **Services**
  - `product.service.ts` — Fetches product data
  - `order.service.ts` — Sends order requests
- **Models**
  - `product.ts` — Product interface


---

## Running the Frontend

```bash
npm install
ionic serve
```