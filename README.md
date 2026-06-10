# 🚀 Inventory Management System (IMS)

<div align="center">

![IMS Banner](https://img.shields.io/badge/Inventory-Management-System-blue?style=for-the-badge)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Django](https://img.shields.io/badge/Django-REST%20Framework-green?style=for-the-badge&logo=django)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)

</div>

---

# 📖 Overview

Inventory Management System (IMS) is a modern full-stack web application designed to help businesses efficiently manage products, inventory, customers, suppliers, sales, and orders through a centralized platform.

The application provides:

- 👨‍💼 Admin Dashboard
- 👤 User Portal
- 📦 Product Management
- 🛒 Cart & Orders
- 📊 Sales Analytics
- 👥 User Management
- 📩 Contact Management
- 🔐 Authentication System
- 🌙 Dark/Light Theme Support

---

# ✨ Features

## 👨‍💼 Admin Features

### Dashboard

- 📈 Sales Analytics
- 📊 Revenue Reports
- 📦 Inventory Overview
- 👥 Customer Statistics
- 🛒 Order Monitoring

### Product Management

- Add Products
- Edit Products
- Delete Products
- Product Images
- Stock Management

### Order Management

- Track Orders
- Update Status
- View Customer Orders

### User Management

- View Users
- Manage User Information
- View Addresses

### Contact Management

- View Contact Messages
- Respond to User Queries

### Sales Management

- Sales Tracking
- Revenue Analytics

---

## 👤 User Features

### Home Page

- Featured Products
- Product Categories
- About IMS
- Contact Information

### Products

- Browse Products
- Product Details
- Product Images
- Pricing Information

### Cart

- Add to Cart
- Remove from Cart
- Quantity Management

### Orders

- Place Orders
- View Order History
- Track Orders

### Dashboard

- Profile Information
- Address Management
- Recent Activity
- Order Overview

### Contact Us

- Send Messages
- Support Requests

---

# 🏗️ System Architecture

```text
┌─────────────────────────┐
│      Next.js Frontend   │
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│ Django REST Framework   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Supabase PostgreSQL DB  │
└─────────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- ⚛️ Next.js 15
- 🎨 Tailwind CSS
- 🧩 ShadCN UI
- 🎬 Framer Motion
- 📊 Recharts
- 📋 TanStack Table
- 🔄 React Query
- 🎯 Lucide Icons

## Backend

- 🐍 Django
- 🚀 Django REST Framework
- 🔐 JWT Authentication
- 📁 Media Storage

## Database

- 🐘 PostgreSQL
- ⚡ Supabase

---

# 📂 Project Structure

```text
IMS-Final-Project/
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   ├── user/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── user/
│   │   │   ├── ui/
│   │   │   └── layouts/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── lib/
│   │
│   ├── package.json
│   └── next.config.js
│
├── backend/
│   │
│   ├── inventory_backend/
│   ├── authentication/
│   ├── products/
│   ├── orders/
│   ├── users/
│   ├── sales/
│   ├── contacts/
│   ├── media/
│   ├── static/
│   ├── requirements.txt
│   └── manage.py
│
├── screenshots/
│
├── README.md
│
└── .gitignore
```

---

# 🔄 Application Flow

```text
User
 │
 ▼
Home Page
 │
 ▼
Browse Products
 │
 ▼
Add to Cart
 │
 ▼
Place Order
 │
 ▼
Order Saved
 │
 ▼
Admin Dashboard
 │
 ▼
Manage Orders
```

---

# 🔐 Authentication Flow

```text
Register
   │
   ▼
Login
   │
   ▼
JWT Authentication
   │
   ▼
Protected Routes
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/IMS-Final-project.git
```

```bash
cd IMS-Final-project
```

---

# 🚀 Frontend Setup

```bash
cd frontend
```

Install Dependencies

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Frontend URL

```text
http://localhost:3000
```

---

# 🚀 Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

Install Requirements

```bash
pip install -r requirements.txt
```

Run Server

```bash
python manage.py runserver
```

Backend URL

```text
http://127.0.0.1:8000
```

---

# 🌐 API Integration

Frontend communicates with Django REST APIs.

Example:

```javascript
GET /api/products/
POST /api/orders/
GET /api/users/
POST /api/contact/
```

---

# 📸 Screenshots

## Home Page

Add Screenshot Here

```text
screenshots/home.png
```

## Admin Dashboard

Add Screenshot Here

```text
screenshots/admin-dashboard.png
```

## User Dashboard

Add Screenshot Here

```text
screenshots/user-dashboard.png
```

## Products Page

Add Screenshot Here

```text
screenshots/products.png
```

---

# 📈 Future Enhancements

- 📱 Mobile Application
- 🔔 Real-Time Notifications
- 📦 Inventory Forecasting
- 🤖 AI Analytics
- 📊 Advanced Reports
- 💳 Payment Gateway Integration

---

# 🤝 Contributing

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push Changes
5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Hitesh Kumar S**
**Venkatesh**
**Ganesh**
**Hari**


🎓 Amrita Vishwa Vidyapeetham

📧 Contact: your-email@example.com

🔗 GitHub: https://github.com/Hitesh2810

---

<div align="center">

⭐ If you like this project, don't forget to star the repository.

Made with ❤️ using Next.js + Django + PostgreSQL

</div>