# Simple Admin Dashboard with Analytics
### A MEAN Stack Student Assignment Project

A beginner-friendly admin dashboard built with MongoDB, Express.js, Angular 17, and Node.js.
Includes JWT authentication, role-based access, user management, content management, and Chart.js analytics.

---

## 📋 Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18.x or v20.x (LTS) |
| npm | v9+ |
| Angular CLI | v17.x |
| MongoDB | v6.x (local) |

---

## ⚙️ Tech Stack

- **MongoDB** — Local database
- **Express.js** 4.18.2 — REST API backend
- **Angular** 17 with NgModule — Frontend SPA
- **Node.js** 18/20 LTS — Runtime
- **JWT** — Authentication tokens
- **Chart.js** 4.4.0 — Bar + Pie charts
- **Bootstrap** 5.3 (CDN) — UI styling

---

## 📁 Project Structure

```
mean-admin-dashboard/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # JWT verify + isAdmin
│   ├── models/
│   │   ├── User.js
│   │   ├── Sale.js
│   │   └── Content.js
│   ├── routes/
│   │   ├── auth.js           # /api/auth
│   │   ├── users.js          # /api/users
│   │   ├── content.js        # /api/content
│   │   └── analytics.js      # /api/analytics
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── components/
    │       │   ├── login/
    │       │   ├── register/
    │       │   ├── dashboard/    # Charts + stats
    │       │   ├── users/        # User table
    │       │   ├── content/      # Content table
    │       │   └── navbar/
    │       ├── guards/
    │       │   ├── auth.guard.ts
    │       │   └── admin.guard.ts
    │       ├── services/
    │       │   ├── auth.service.ts
    │       │   └── api.service.ts
    │       ├── app.module.ts
    │       └── app-routing.module.ts
    ├── angular.json
    └── package.json
```

---

## 🚀 Setup Instructions

### Step 1 — Install MongoDB

Download and install MongoDB Community Edition from:
https://www.mongodb.com/try/download/community

Start MongoDB service:
```bash
# Windows
net start MongoDB

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Verify it's running:
```bash
mongosh
```

---

### Step 2 — Setup the Backend

```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin_dashboard
JWT_SECRET=mysecretkey123changethis
```

Start the backend:
```bash
# Development (with auto-restart)
npm run dev

# OR production
npm start
```

✅ Backend runs at: `http://localhost:5000`

> **Note:** On first run, the server auto-seeds 12 months of dummy sales data into MongoDB.

---

### Step 3 — Install Angular CLI

```bash
npm install -g @angular/cli@17
```

---

### Step 4 — Setup the Frontend

```bash
cd frontend
npm install
```

Start the Angular app:
```bash
ng serve
```

✅ Frontend runs at: `http://localhost:4200`

---

## 👤 Creating Your First Admin Account

1. Open `http://localhost:4200/register`
2. Fill in name, email, password
3. Select **Role: Admin**
4. Click Register
5. Login with your new credentials

---

## 🔑 Features Walkthrough

### Authentication
- Register at `/register` — select role (admin/user)
- Login at `/login` — JWT token stored in localStorage
- Only admin accounts can access the dashboard

### Dashboard `/dashboard`
- **Total Users** stat card
- **Total Sales** stat card (sum of all monthly sales)
- **New Signups** in last 7 days
- **Bar Chart** — Monthly sales for 2024 (auto-seeded data)
- **Pie Chart** — Admin vs User ratio

### Users `/users`
- Table of all registered users
- **Change Role** button (toggles admin ↔ user)
- **Delete** button (cannot delete yourself)

### Content `/content`
- Add content with title + description
- View all content in a table
- Delete any content item

---

## 🛠️ API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | Login, returns JWT |
| GET | `/api/analytics` | Admin | Dashboard stats + chart data |
| GET | `/api/users` | Admin | List all users |
| DELETE | `/api/users/:id` | Admin | Delete a user |
| PUT | `/api/users/:id/role` | Admin | Change user role |
| GET | `/api/content` | Auth | List all content |
| POST | `/api/content` | Admin | Add content |
| DELETE | `/api/content/:id` | Admin | Delete content |

---

## ❗ Troubleshooting

**MongoDB connection error**
→ Make sure MongoDB service is running (`mongosh` to test)

**Port 5000 already in use**
→ Change `PORT=5001` in your `.env` and update `apiUrl` in frontend services

**CORS error in browser**
→ Confirm backend is running on port 5000

**Angular build errors**
→ Make sure you're using Node 18 or 20. Run `node -v` to check.

**`ng` command not found**
→ Run `npm install -g @angular/cli@17`

---

## 📌 Notes for Students

- JWT token is stored in `localStorage` for simplicity (not recommended in production)
- Sales data is auto-seeded on first backend start
- Charts use Chart.js v4 with vanilla canvas rendering (no wrapper library)
- All Angular components use NgModule (traditional structure, no standalone components)
- Bootstrap is loaded via CDN in `index.html` (no npm install needed)

---

## 📄 License

This project is for educational purposes only.
