# 🚀 Deployment Guide — Bangla Store Admin Dashboard

This document describes how the Bangla Store Admin Dashboard is deployed to the production server.

---

## 🖥️ Production Environment

| Detail | Value |
|---|---|
| **Server IP** | `167.233.34.127` |
| **Public URL** | `http://167.233.34.127:3001` |
| **Port** | `3001` |
| **Deployment Method** | Docker + Docker Compose |
| **Runtime** | Node.js 20 Alpine |
| **Server OS** | Linux (VPS) |

---

## 🐳 Docker Setup

The app is containerized using a multi-stage Dockerfile:

1. **Stage 1 (`deps`)**: Installs npm dependencies.
2. **Stage 2 (`builder`)**: Builds the Next.js production bundle.
3. **Stage 3 (`runner`)**: Serves the standalone output using Node.js on port `3001`.

---

## 📦 Deployment Steps

### 1. SSH into the Server

```bash
ssh root@167.233.34.127
```

### 2. Navigate to the project directory

```bash
cd /opt/website/Bangla-store-Admin
```

### 3. Pull the latest code

```bash
git pull origin main
```

### 4. Rebuild and restart the container

```bash
docker compose build admin
docker compose up -d admin
```

---

## 🔄 Quick Deploy from Local (rsync)

```bash
# Sync local src/ changes to the server
rsync -avz ./src/ root@167.233.34.127:/opt/website/Bangla-store-Admin/src/

# Rebuild and restart on the server
ssh root@167.233.34.127 'cd /opt/website/Bangla-store-Admin && docker compose build admin && docker compose up -d admin'
```

---

## 🌐 Backend API

The admin dashboard connects to the Django REST backend at:

```
http://167.233.34.127:8000/api/
```

Key endpoints used:
- `GET/POST /api/products/categories/` — Category management
- `GET/POST /api/products/` — Product management
- `GET/PUT/DELETE /api/products/{id}/` — Single product CRUD (Note: URL-encode IDs with `#`)
- `GET/POST /api/orders/` — Order management
- `GET/PUT /api/orders/{id}/` — Update order status
- `GET /api/dashboard/stats/` — Dashboard statistics (revenue, orders, customers, products)
- `GET /api/dashboard/sales-overview/` — Monthly sales chart data

### ⚠️ Important Note on Order IDs
Order IDs contain the `#` character (e.g., `#BS-123456`). When making PUT/DELETE requests, the ID **must be URL-encoded**: `%23BS-123456`.

```javascript
const encodedId = encodeURIComponent(order.id); // #BS-123456 → %23BS-123456
await fetch(`/api/orders/${encodedId}/`, { method: 'PUT', ... });
```

---

## 🔗 Related Services

| Service | URL |
|---|---|
| **Customer Frontend** | `http://167.233.34.127:3000` |
| **Backend API** | `http://167.233.34.127:8000/api/` |
