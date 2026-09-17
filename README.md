# Bangla Store Admin Dashboard

The Admin Dashboard for Bangla Store, focused on extreme simplicity and ease of use. This panel is meant to manage the core functionalities of the eCommerce platform without overwhelming the user with complex, unused features.

## Philosophy

The goal of this dashboard is **simplicity**. It deliberately strips away overly complex features like deep analytics, blogging features, coupon management, or advanced configurations to focus entirely on day-to-day operations:
- Seeing high-level metrics on the dashboard (Revenue, Orders, Customers, Products).
- Managing Products (Uploading, editing, tracking inventory).
- Managing Orders (Tracking statuses, fulfillment).

## Tech Stack

- **Framework**: Next.js 16+
- **Styling**: Tailwind CSS, Recharts (for dashboard graphs), Lucide React (for icons)
- **Language**: TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the Admin panel.

## Features

- **Dashboard**: High-level insights featuring key metrics, recent orders, and top-selling products.
- **Orders**: Simple interface to view order details and update fulfillment statuses.
- **Products**: Minimalist interface to upload and manage the product catalog.

## Customization

The codebase has been specifically trimmed down. If new sections (e.g., Categories, Customers, Analytics) are required in the future, they should be built with the same design philosophy of keeping things highly functional yet simple.
