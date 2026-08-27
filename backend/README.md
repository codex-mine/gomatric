# GoMatric Backend — Travel Agency Platform

Production-ready NestJS backend foundation for **GoMatric**, a modern travel agency platform providing Visa Processing, Tour Packages, Flight Ticketing, Hotel Booking, Travel Insurance, and agency management.

---

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (v10) with Express
- **Language**: TypeScript (strict mode)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (v8)
- **Authentication**: JWT Access Token (15m) + Rotating Refresh Token (7d)
- **Password Hashing**: Argon2 (`argon2id`)
- **Authorization**: Granular Role-Based Access Control (RBAC) + Permission Guards
- **Security**: Helmet, CORS, Rate Limiting (`@nestjs/throttler`), Global Validation (`class-validator`), Mongo Injection Protection
- **Documentation**: Swagger / OpenAPI 3.0 at `/api/docs`
- **Containerization**: Docker & Docker Compose

---

## 📁 Architecture & Directory Structure

```text
src/
├── common/                     # Cross-cutting concerns and shared utilities
│   ├── constants/              # Enums for Roles, Permissions, and Domain Statuses
│   ├── decorators/             # @CurrentUser, @Roles, @RequirePermissions, @Public
│   ├── dto/                    # Standardized PaginationDto & ApiResponseDto
│   ├── filters/                # Global AllExceptionsFilter (sanitized error output)
│   ├── guards/                 # JwtAuthGuard, RefreshTokenGuard, RolesGuard, PermissionsGuard, Throttler
│   ├── interceptors/           # TransformResponseInterceptor, LoggingInterceptor
│   ├── middleware/             # CorrelationIdMiddleware
│   ├── pipes/                  # ParseObjectIdPipe
│   └── utils/                  # HashUtil (Argon2), Pagination helper, Schema transforms
│
├── config/                     # Centralized, strongly-typed environment config
│   ├── app.config.ts           # Port, prefix, CORS, Swagger
│   ├── auth.config.ts          # JWT secrets and TTLs
│   ├── database.config.ts      # MongoDB connection URI
│   ├── throttler.config.ts     # Rate limit configuration
│   └── env.validation.ts       # Startup validation for env vars
│
├── database/                   # Database connection and data layer abstractions
│   ├── database.module.ts      # Async Mongoose connection
│   └── abstract.repository.ts  # Generic base repository with CRUD & pagination
│
├── modules/                    # Feature modules
│   ├── auth/                   # Register, Login, Refresh, Logout, Forgot/Reset Password
│   ├── users/                  # User accounts, passwords, and role management
│   ├── customers/              # Customer CRM profiles and traveler records
│   ├── services/               # Travel services catalog (Visa, Tour, Flights, etc.)
│   ├── destinations/           # Destinations, popular/featured destinations
│   ├── visas/                  # Visa applications, tracking, status transitions
│   ├── tours/                  # Curated tour packages and day-by-day itineraries
│   ├── bookings/               # Confirmed bookings, travel dates, status progression
│   ├── leads/                  # CRM leads and public inquiries
│   ├── quotations/             # Custom multi-item quotations and approvals
│   ├── payments/               # Payment transactions, receipts, and verification
│   ├── documents/              # Document vault and verification workflow
│   ├── notifications/          # In-app notifications and event alerts
│   ├── audit-logs/             # Security and administrative audit trail
│   └── health/                 # Liveness & MongoDB connectivity health check
│
├── app.module.ts               # Root application module wiring
└── main.ts                     # Application bootstrap and security middleware
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `backend/` directory:

```env
# Application
NODE_ENV=development
PORT=5000
API_PREFIX=api/v1

# MongoDB
MONGODB_URI=mongodb://localhost:27017/gomatric

# JWT Authentication
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars!
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars!
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Documentation
SWAGGER_ENABLED=true
```

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

If using Docker:

```bash
docker-compose up mongodb -d
```

Or run a local MongoDB instance on `mongodb://localhost:27017`.

### 3. Run the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production build
npm run build
npm run start:prod
```

### 4. Verify Liveness

- **API Base URL**: `http://localhost:5000/api/v1`
- **Health Check**: `http://localhost:5000/health`
- **Swagger Documentation**: `http://localhost:5000/api/docs`

---

## 🔒 Security & Authentication Architecture

1. **Password Hashing**: Uses Argon2 (`argon2id` profile with 64MB memory cost) for collision and brute-force resistance.
2. **Rotating Refresh Tokens**:
   - Access tokens are short-lived (`15m`).
   - Refresh tokens are hashed before storing in MongoDB.
   - On logout or refresh, the old token hash is rotated or cleared to prevent replay attacks.
3. **Data Sanitization**:
   - Mongoose JSON schema transforms automatically strip `passwordHash`, `refreshTokenHash`, `passwordResetToken`, and `__v` from all outgoing responses.
4. **Rate Limiting**: Configured with `@nestjs/throttler` (default: 100 requests per 60s per IP).
5. **Audit Logging**: All security actions (`USER_LOGIN`, `USER_REGISTER`, `APPLICATION_STATUS_CHANGED`, `PAYMENT_RECORDED`, etc.) are recorded in the `AuditLog` collection with actor, IP address, user agent, and timestamp.

---

## 👥 User Roles & Permissions

| Role | Description |
| :--- | :--- |
| **ADMIN** | Complete control over platform, users, staff, services, audit logs, and settings. |
| **MANAGER** | Full management over bookings, visas, tours, quotations, payments, and customers. |
| **AGENT** | CRM operations, lead handling, visa status updates, quotations, and customer support. |
| **CUSTOMER** | Public access, profile management, personal visa applications, quotations, and documents. |

---

## 📡 Core API Endpoints

### Health & Docs
- `GET /health` — Application and MongoDB health status
- `GET /api/docs` — Interactive Swagger UI

### Authentication (`/api/v1/auth`)
- `POST /register` — Register customer account
- `POST /login` — Login and receive access + refresh token
- `POST /refresh` — Refresh access token
- `POST /logout` — Invalidate session
- `GET  /me` — Current authenticated user profile
- `POST /forgot-password` — Request password reset token
- `POST /reset-password` — Reset password using token

### User Management (`/api/v1/users`)
- `GET    /` — List users (Admin/Manager)
- `POST   /` — Create staff/admin user (Admin/Manager)
- `GET    /:id` — Get user details
- `PATCH  /:id` — Update user
- `PATCH  /:id/change-password` — Change password
- `DELETE /:id` — Delete user (Admin only)

### Public & Domain Endpoints
- `GET  /api/v1/services/public` — Active services catalog
- `GET  /api/v1/destinations/featured` — Featured destinations
- `GET  /api/v1/tours/featured` — Featured tour packages
- `POST /api/v1/leads/inquiry` — Public inquiry submission
- `GET  /api/v1/visas/track/:applicationNumber` — Public visa tracking
- `GET  /api/v1/audit-logs` — Audit trail (Admin only)

---

## 🧪 Testing & Linting

```bash
# Run unit tests
npm run test

# Run linter and format code
npm run lint
npm run format
```
