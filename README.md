# Full-Stack Employee Management System

A production-grade, full-stack Employee Management System built with **Node.js, Express, TypeScript, TypeORM, MySQL**, and **React (Vite + TypeScript)** with **Docker** and **GitHub Actions (CI/CD)**.

## Project Features

- **Authentication & Authorization**: JWT token-based authentication with Role-Based Access Control (`Admin`, `User`) and password hashing using `bcryptjs`.
- **Department Management**: Complete CRUD operations, sorting, filtering, and pagination.
- **Employee Management**: Complete CRUD operations, department associations, dynamic search, sorting, and pagination.
- **Admin Dashboard**: Real-time overview metrics (employee counts, department distribution, recent hires).
- **OpenAPI Documentation**: Integrated Swagger UI documentation.
- **Database Migrations**: TypeORM migrations handling version-controlled database schema changes.
- **Containerization**: Full Docker & Docker Compose setup for backend, frontend, and MySQL database.
- **CI/CD Pipeline**: GitHub Actions workflow for automated linting, type-checking, and build validation.

---

## Directory Structure

```
assessment_UMC/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── backend/
│   ├── src/
│   │   ├── config/          # DataSource & Environment configurations
│   │   ├── controllers/     # API endpoints controllers
│   │   ├── dtos/            # Data validation schemas
│   │   ├── entities/        # TypeORM database models
│   │   ├── middlewares/     # JWT Authentication & RBAC permissions
│   │   ├── migrations/      # TypeORM migration history
│   │   ├── services/        # Business logic layer
│   │   ├── swagger/         # API OpenAPI documentation setup
│   │   ├── app.ts           # Express application initialization
│   │   └── index.ts         # Application entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance & interceptors
│   │   ├── components/      # UI components (Tables, Modals, Navbar, Sidebar)
│   │   ├── context/         # AuthContext & state management
│   │   ├── pages/           # Dashboard, Login, Employee & Dept pages
│   │   ├── App.tsx          # Main React router
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## Quick Start (Docker)

To start the complete stack (Database, Backend API, Frontend App):

```bash
docker compose up -d --build
```

- **Frontend App**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/api-docs

---

## Local Development

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
