# 📝 MellowTodo
> A minimalist, full-stack task management application designed for focus and clarity.

MellowTodo is built using the **MERN stack**, featuring a secure authentication system and a clean user interface. It allows users to organize their lives without the clutter of traditional productivity apps.

---

## ✨ Features
* **Secure Authentication:** JWT-based login and signup system.
* **Protected Routes:** Unauthorized users are automatically redirected to the login page.
* **Full CRUD:** Create, Read, Update, and Delete tasks in real-time.
* **Responsive Design:** Works beautifully on desktop and mobile.
* **Synchronized State:** Uses `useEffect` and custom hooks for a seamless UI experience.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
| :--- | :--- | :--- |
| React (Vite) | Node.js | MongoDB |
| React Router | Express.js | Mongoose |
| Axios | JWT & Cookies | |

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js installed on your machine.
* A MongoDB Atlas account or local MongoDB instance.

### 2. Installation
Clone the repository:
```bash
git clone [https://github.com/your-username/mellow-todo.git](https://github.com/your-username/mellow-todo.git)
cd mellow-todo
```

### 3. Setup Server
Install the dependencies and start the Back-end server:
```bash
cd server
npm install
npm start
```

### 4. Setup Client
Install the dependencies and start the Front-end server:
```bash

cd client
npm install
npm run dev
```