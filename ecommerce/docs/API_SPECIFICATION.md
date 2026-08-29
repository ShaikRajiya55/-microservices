# NexusCart Enterprise E-Commerce Platform - API Specification v1.0

## Overview
NexusCart exposes a RESTful JSON API for store operations, product management, user authentication, cart calculations, checkout processing, payment gateway integration, and admin analytics.

## Base URL
`https://api.nexuscart.com/api/v1` or `http://localhost:8000/api/v1`

## Authentication
Authentication is handled via JWT (JSON Web Tokens) passed in the `Authorization` header:
`Authorization: Bearer <your_jwt_access_token>`

---

## 1. Authentication Endpoints

### POST `/auth/register`
Register a new customer account.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+1-555-0199"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "expiresIn": 86400,
      "user": {
        "id": "usr_12345",
        "email": "user@example.com",
        "firstName": "Jane",
        "lastName": "Doe",
        "roles": ["CUSTOMER"]
      }
    }
  }
  ```

### POST `/auth/login`
Authenticate existing credentials.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  ```

### GET `/auth/profile`
Get current authenticated user profile. Requires Bearer Token.

---

## 2. Catalog & Product Endpoints

### GET `/catalog/products`
List products with filtering, search, and pagination.
- **Query Parameters**:
  - `q`: Search keyword string
  - `categoryId`: Filter by category UUID
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)

### GET `/catalog/products/:slug`
Retrieve detailed product specification by URL slug.

---

## 3. Cart & Discount Endpoints

### GET `/cart/:cartId`
Get current shopping cart items and calculated totals.

### POST `/cart/:cartId/items`
Add product variant to cart.
- **Request Body**:
  ```json
  {
    "variantId": "var_01_sg",
    "quantity": 1
  }
  ```

### POST `/cart/:cartId/coupon`
Apply promo code discount to cart.
- **Request Body**:
  ```json
  {
    "couponCode": "NEXUS20"
  }
  ```

---

## 4. Checkout & Orders

### POST `/checkout`
Process shopping cart into an order draft.

### POST `/payments/process`
Process payment card intent.

---

## 5. Admin Analytics

### GET `/admin/analytics/dashboard`
Retrieve store KPI revenue metrics, order totals, and customer conversion rate.
