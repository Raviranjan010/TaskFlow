# TASCOVA

> "Your tasks, elevated."

TASCOVA is a warm, handcrafted, and editorial personal task management application. Built using a Node.js/Express backend paired with a Mongoose/MongoDB data persistence layer, and a React 18 frontend structured with Vite, React Router v6, Axios, and Tailwind CSS.

---

## Features

- **JWT Authentication**: Secure user registration and login.
- **User-Scoped Actions**: Each user sees, edits, and manages *only* their own tasks.
- **Dashboard Status Metrics**: Instant widgets summarizing pending and completed items.
- **Filter Capabilities**: Toggle instantly between *All*, *Pending*, and *Completed* views.
- **Task Scheduling**: Manage descriptions and due dates seamlessly.
- **Editorial Custom Aesthetic**: Zero templates, styled intentionally with deep stone, warm amber, off-white background (#F5F0E8), and zero gradients.

---

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Local instance running at port 27017, or MongoDB Atlas connection string)

---

## Installation & Setup

1. **Clone & Project Initialization**:
   Ensure you have the required project structure ready.

2. **Environment Variables**:
   In the root of the project, define the `.env` configuration file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tascova
   JWT_SECRET=supersecretjwtkeytascova123!
   ```

3. **Backend Dependencies Setup**:
   ```bash
   cd server
   npm install
   ```

4. **Frontend Dependencies Setup**:
   ```bash
   cd ../client
   npm install
   ```

---

## Running the Application Locally

1. **Start the API Server**:
   From the `/server` directory:
   ```bash
   npm run dev
   ```
   The backend will bootstrap and connect to MongoDB on port `5000`.

2. **Start the Vite Frontend**:
   From the `/client` directory:
   ```bash
   npm run dev
   ```
   The application UI will run at `http://localhost:5173`. Open this URL in your web browser.

---

## API Endpoints List

### Authentication
- `POST /api/auth/register` — Create a new account.
- `POST /api/auth/login` — Sign in to an existing account.

### Tasks (Protected - Bearer Token Required)
- `GET /api/tasks?status=all|pending|completed` — Fetch all user-scoped tasks.
- `POST /api/tasks` — Create a new task.
- `PUT /api/tasks/:id` — Update task fields (Title, Description, Due Date).
- `PATCH /api/tasks/:id/complete` — Toggle task completion status.
- `DELETE /api/tasks/:id` — Erase a task permanently.