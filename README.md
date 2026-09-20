<div align="center">

# ⚙️ Bangla Store — Admin Dashboard

**A clean and minimal admin panel for managing the Bangla Store eCommerce platform.**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Dashboard** | Real-time metrics: Total Revenue, Orders, Customers, Products fetched from the backend API |
| 📦 **Orders** | View, filter, and update order statuses (Pending → Processing → Shipped → Delivered → Cancelled) |
| 🛒 **Products** | Add, edit, delete products with image upload support |
| 🗂️ **Categories** | Full CRUD for product categories including image uploads |
| 👥 **Customers** | View customer information |
| ⚙️ **Settings** | Basic store settings |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for sales graphs)
- **Icons**: Lucide React
- **API**: Django REST Framework backend at `http://167.233.34.127:8000`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard with real API metrics
│   ├── orders/               # Order management (list + edit status)
│   ├── products/             # Product CRUD with image upload
│   ├── categories/           # Category CRUD with image upload
│   ├── customers/            # Customer list
│   └── settings/             # Store settings
└── components/
    ├── Sidebar.tsx           # Navigation sidebar
    └── ...
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- Backend running at `http://localhost:8000` (see [Bangla-store-Backend](https://github.com/Mehedi259/Bangla-store-Backend))

### Setup

```bash
# Clone the repository
git clone https://github.com/Mehedi259/Bangla-store-Admin.git
cd Bangla-store-Admin

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| [Bangla-store](https://github.com/Mehedi259/Bangla-store) | Customer-facing frontend |
| [Bangla-store-Backend](https://github.com/Mehedi259/Bangla-store-Backend) | Django REST API backend |

---

## 📄 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.
