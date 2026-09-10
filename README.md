# Full-Stack Employee Management System

A production-grade, full-stack Employee Management System built with **Node.js, Express, TypeScript, TypeORM, MySQL**, **React 18 (Vite + TypeScript + Tailwind CSS)**, **Docker & Docker Compose**, and **GitHub Actions (CI/CD)**.

---

## Technical Stack & Architecture

### Backend Stack (`backend/`)
- **Runtime & Language**: Node.js, Express.js, TypeScript
- **Database & ORM**: MySQL 8.0, TypeORM (`DataSource`, Entities, Migrations, QueryBuilder)
- **Authentication & Security**: JWT (JSON Web Tokens), `bcryptjs` password hashing & salting, CORS, Helmet, Zod schema input validation
- **Documentation**: Integrated Swagger UI / OpenAPI 3.0 specification at `/api-docs/`
- **Architecture Pattern**: Controller - Service - Repository / Entity pattern with centralized async error handling & RBAC middlewares (`Admin` vs `User`)

### Frontend Stack (`frontend/`)
- **Framework & Tooling**: React 18, Vite, TypeScript
- **Styling & UI**: Tailwind CSS, Lucide Icons, Glassmorphism dark layout
- **Visualization & Charts**: Recharts department distribution analytics
- **State & Routing**: React Context API (`AuthContext`), React Router v6, Axios HTTP client with request/response interceptors

### DevOps & CI/CD
- **Containerization**: Multi-stage `Dockerfile` for Backend and Frontend (Nginx), orchestrated via `docker-compose.yml`
- **CI/CD Pipeline**: GitHub Actions workflow for automated linting, type-checking, and build validation

---

## Directory Structure

```
assessment_UMC/
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions CI/CD pipeline
├── backend/
│   ├── src/
│   │   ├── config/          # DataSource & Environment configurations
│   │   ├── controllers/     # API endpoints controllers
│   │   ├── dtos/            # Zod validation schemas
│   │   ├── entities/        # TypeORM database models (User, Department, Employee)
│   │   ├── middlewares/     # JWT Auth & Role-Based Access Control (RBAC)
│   │   ├── migrations/      # TypeORM migration history
│   │   ├── routes/          # Express route definitions
│   │   ├── seeds/           # Database seed script for initial accounts
│   │   ├── services/        # Core business logic layer
│   │   ├── swagger/         # Swagger OpenAPI 3.0 configuration
│   │   ├── app.ts           # Express application initialization
│   │   └── index.ts         # Application entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance & API client modules
│   │   ├── components/      # Navbar, Sidebar, Layout, Toast, ProtectedRoute
│   │   ├── context/         # AuthContext session management
│   │   ├── pages/           # LoginPage, DashboardPage, EmployeesPage, DepartmentsPage
│   │   ├── types/           # Shared TypeScript models and interfaces
│   │   ├── App.tsx          # Main React router
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf           # Nginx web server configuration
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml       # Docker container orchestration
└── README.md
```

---

## Quick Start Guide

### Option 1: Run via Docker Compose (Recommended)

To launch the complete application stack (Database, Backend API, Frontend App):

```bash
docker compose up -d --build
```

- **Frontend App UI**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Swagger Documentation UI**: http://localhost:5000/api-docs/

#### Populate Initial Seed Data in Docker:
```bash
docker exec -it ems_backend_api npm run seed
```

---

### Option 2: Run Locally (Development Mode)

#### 1. Start Database Container
```bash
docker compose up db -d
```

#### 2. Backend Setup & Seeding
```bash
cd backend
npm install
npm run seed
npm run dev
```

#### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

---

## Demo Credentials (Seeded Accounts)

| Role | Username | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` | Full access (View, Create, Edit, Delete) |
| **User** | `user` | `user123` | Read-only access (View Dashboard, Employees, Departments) |

---

## API Endpoints Overview

### Authentication
- `POST /api/auth/login` - Authenticate credentials and receive JWT token
- `POST /api/auth/register` - Create new user account
- `GET /api/auth/me` - Retrieve current user profile (Protected)

### Departments
- `GET /api/departments` - List paginated departments (Search & Sort)
- `POST /api/departments` - Create department (Admin Only)
- `GET /api/departments/:id` - Get department details
- `PUT /api/departments/:id` - Update department (Admin Only)
- `DELETE /api/departments/:id` - Delete department (Admin Only)

### Employees
- `GET /api/employees` - List paginated employees (Search, Dept Filter & Sort)
- `POST /api/employees` - Create employee (Admin Only)
- `GET /api/employees/:id` - Get employee details
- `PUT /api/employees/:id` - Update employee details (Admin Only)
- `DELETE /api/employees/:id` - Delete employee (Admin Only)

### Dashboard Analytics
- `GET /api/dashboard/stats` - Overview metrics (Total count, distribution, recent hires)

---

## Build & Testing Verification

### Backend Build Check
```bash
cd backend
npm run build
```

### Frontend Build Check
```bash
cd frontend
npm run build
```
