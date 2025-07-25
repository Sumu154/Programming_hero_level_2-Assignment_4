# 📚 Minimal Library Management System

A simple public library management system built with **React**, **Redux Toolkit Query**, **TypeScript**, **Express**, and **MongoDB**. Users can view, manage, and borrow books without authentication.

---

## 🚀 Live Demo

- **Frontend:** [frontend-link](https://client-side-seven-xi.vercel.app/)
- **Backend:** [backend-link](https://server-side-psi-one.vercel.app/)

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** Redux Toolkit + RTK Query
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Validation:** Zod

---

## ✨ Features

-  Book CRUD (Add, Edit, Delete)
-  Borrow books with quantity & due date
-  Auto-disable unavailable books
-  Borrow summary by book & quantity
-  Real-time updates (with RTK Query tags)
-  Toast notifications, responsive UI

---



## 📦 Setup Instructions

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
cp .env.example .env  # Add Mongo URI
npm run dev
```
