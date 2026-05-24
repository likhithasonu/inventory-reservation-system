# Multi-Warehouse Inventory Reservation System

A full-stack inventory reservation platform built using Next.js, Prisma, and Neon PostgreSQL.

---

# Features

## Inventory Management
- Multi-product inventory system
- Multi-warehouse stock tracking
- Available stock calculation
- Reserved stock management

## Reservation System
- Create reservations
- Confirm reservations
- Release/cancel reservations
- Reservation expiry support

## APIs

### GET /api/products
Returns products with warehouse stock information.

### GET /api/warehouses
Returns all warehouses.

### POST /api/reservations
Creates a stock reservation.

### POST /api/reservations/[id]/confirm
Confirms reservation and permanently deducts stock.

### POST /api/reservations/[id]/release
Releases reserved stock back to inventory.

---

# Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- Neon PostgreSQL
- React
- Tailwind CSS

---

# Database Design

## Product
Stores product details.

## Warehouse
Stores warehouse information.

## Inventory
Tracks:
- total stock
- reserved stock
- available stock

## Reservation
Tracks:
- reservation status
- reserved quantity
- expiry time

---

# Reservation Flow

1. User clicks reserve product
2. Reservation is created
3. Reserved stock increases
4. Available stock decreases
5. Reservation can later be:
   - confirmed
   - released/cancelled

---

# Expiry Mechanism

Reservations include an `expiresAt` field.

In production, expired reservations can be automatically released using:
- Vercel Cron Jobs
- background workers
- scheduled cleanup jobs

---

# Concurrency Handling

The reservation system prevents overselling by checking available stock before creating reservations.

Future improvements can include:
- database transactions
- row-level locking
- Redis distributed locking

---

# Frontend Features

- Interactive inventory dashboard
- Product cards with images
- Warehouse stock display
- Low stock alerts
- Reservation success messages
- Responsive modern UI

---

# Setup Instructions

## Install Dependencies

```bash
npm install

Generate Prisma Client
npx prisma generate
Push Database Schema
npx prisma db push
Seed Database
npx prisma db seed
Run Project
npm run dev

Database

Hosted on Neon PostgreSQL.

Future Improvements
Automatic reservation expiry cleanup
Countdown timer UI
Reservation history
Better concurrency handling
Analytics dashboard
Admin management panel

Author

Built by Likhitha