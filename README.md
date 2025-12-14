# Sweet Shop Management System

A full-stack monorepo application for managing a sweet shop with user authentication, inventory management, and purchase functionality. Built with modern web technologies following TDD principles and SOLID design patterns.


PROOF
<img width="1912" height="320" alt="Screenshot 2025-12-13 010443" src="https://github.com/user-attachments/assets/aef49dc9-6b88-417b-86ff-3647efe45f8c" />


<img width="1914" height="954" alt="Screenshot 2025-12-13 010501" src="https://github.com/user-attachments/assets/64ff18df-80d7-4016-b525-d50a88ba0591" />


<img width="1904" height="959" alt="Screenshot 2025-12-13 010510" src="https://github.com/user-attachments/assets/d196aa5f-39a2-434b-8699-579751cd1f18" />


<img width="1909" height="979" alt="Screenshot 2025-12-13 010542" src="https://github.com/user-attachments/assets/12d1835a-e261-4bf4-ba41-76451279acb9" />


<img width="1919" height="416" alt="Screenshot 2025-12-13 010556" src="https://github.com/user-attachments/assets/bef81b81-acf4-4975-a383-257d6379a9a0" />


<img width="1912" height="284" alt="Screenshot 2025-12-13 010606" src="https://github.com/user-attachments/assets/f7d70242-491d-4aad-84bd-0915b05398ed" />



## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [My AI Usage](#my-ai-usage)
- [License](#license)

## 🎯 Project Overview

The Sweet Shop Management System is a comprehensive e-commerce solution for managing a sweet shop's inventory and sales. It provides:

- **User Authentication**: Secure registration and login with JWT tokens
- **Role-Based Access Control**: Admin and Customer roles with different permissions
- **Inventory Management**: Full CRUD operations for sweets (Admin only)
- **Purchase System**: Customers can purchase sweets with automatic inventory updates
- **Search & Filter**: Advanced search functionality by name, category, and price range
- **Beautiful UI**: Modern, responsive design with Tailwind CSS and custom components

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **UI Components**: Custom components inspired by Shadcn UI

### Development Tools
- **Monorepo**: npm workspaces
- **TypeScript**: Full type safety
- **Code Quality**: ESLint, TypeScript strict mode

## ✨ Features

### Authentication & Authorization
- ✅ User Registration (POST /api/auth/register)
- ✅ User Login (POST /api/auth/login)
- ✅ JWT Token-based Authentication
- ✅ Role-based Access Control (ADMIN/CUSTOMER)
- ✅ Password Hashing with bcrypt
- ✅ Persistent Sessions (localStorage)

### Sweets Management
- ✅ Create Sweet (POST /api/sweets) - Admin only
- ✅ List All Sweets (GET /api/sweets) - Public
- ✅ Search Sweets (GET /api/sweets/search) - Public
- ✅ Update Sweet (PUT /api/sweets/:id) - Admin only
- ✅ Delete Sweet (DELETE /api/sweets/:id) - Admin only
- ✅ Purchase Sweet (POST /api/sweets/:id/purchase) - Protected
- ✅ Restock Sweet (POST /api/sweets/:id/restock) - Admin only

### Frontend Features
- ✅ Beautiful Dashboard with Grid Layout
- ✅ Sweet Cards with Category-based Colors
- ✅ Search Functionality (Client-side + API)
- ✅ Purchase Button (disabled when quantity is 0)
- ✅ Admin Panel for Inventory Management
- ✅ Toast Notifications for User Feedback
- ✅ Loading States and Error Handling
- ✅ Responsive Design

### Database
- ✅ User Model (id, email, password hash, role, timestamps)
- ✅ Sweet Model (id, name, category, price, quantity, timestamps)
- ✅ Prisma Migrations
- ✅ Database Seeding Script

## 📁 Project Structure

```
sweet-shop-management-system/
├── server/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   └── index.ts        # Entry point
│   ├── tests/              # Test files
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── seed.ts         # Seed script
│   │   └── dev.db          # SQLite database
│   ├── package.json
│   └── tsconfig.json
├── client/                 # Frontend React App
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # API client
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main component
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── package.json            # Root workspace config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sweet-shop-management-system
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install server dependencies**
```bash
cd server
npm install
```

4. **Install client dependencies**
```bash
cd ../client
npm install
```

5. **Setup database**

Navigate to the server directory:
```bash
cd ../server
```

The `.env` file is already configured for SQLite. If you need to create it:
```bash
# Create .env file with:
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
NODE_ENV=development
```

Run migrations:
```bash
npx prisma migrate dev
```

Seed the database with sample data:
```bash
npm run prisma:seed
```

### Running the Application

**Option 1: Run both servers separately**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

**Option 2: Use root scripts**

Terminal 1:
```bash
npm run dev:server
```

Terminal 2:
```bash
npm run dev:client
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Docs**: See [API Documentation](#api-documentation) below

### Default Test Credentials

After seeding, you can register a new user or use the existing admin:
- Email: (register a new user)
- Role: Select "ADMIN" during registration for admin access

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "CUSTOMER" // or "ADMIN"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Sweets Endpoints

#### Get All Sweets (Public)
```http
GET /api/sweets
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": 2.99,
    "quantity": 50,
    "createdAt": "2025-12-13T00:24:58.000Z",
    "updatedAt": "2025-12-13T00:24:58.000Z"
  }
]
```

#### Search Sweets (Public)
```http
GET /api/sweets/search?name=chocolate&category=Chocolate&minPrice=1&maxPrice=5
```

**Query Parameters:**
- `name` (optional): Search by name
- `category` (optional): Filter by category
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Sweet",
  "category": "Chocolate",
  "price": 3.99,
  "quantity": 100
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 4.99,
  "quantity": 150
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <token>
```

#### Purchase Sweet (Protected)
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 1
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 50
}
```

## 📸 Screenshots

### Dashboard View
![Dashboard showing all available sweets in a grid layout with search functionality](screenshots/dashboard.png)

### Admin Panel
![Admin panel showing inventory management with add, edit, delete, and restock options](screenshots/admin-panel.png)

### Login/Register
![Authentication forms with email and password fields](screenshots/auth.png)

### Sweet Cards
![Beautiful sweet cards with category-based colors, emojis, and purchase buttons](screenshots/sweet-cards.png)

> **Note**: Add your screenshots to the `screenshots/` directory and update the paths above.

## 🧪 Testing

### Running Tests

**Important**: Make sure the development server is not running before executing tests, as tests start their own server instance.

**Backend Tests:**
```bash
cd server
npm test
```

**Backend Tests with Coverage:**
```bash
cd server
npm run test:coverage
```

**Watch Mode:**
```bash
cd server
npm run test:watch
```

### Test Report

Run the test suite and generate a coverage report:

```bash
cd server
npm run test:coverage
```

**Test Structure:**

The project follows **Test-Driven Development (TDD)** with tests written before implementation:

1. **Auth Tests** (`tests/auth.test.ts`):
   - User registration endpoint
   - JWT token generation
   - Response validation

2. **Sweets Tests** (`tests/sweets.test.ts`):
   - Admin-only endpoint protection
   - Public endpoint access
   - Purchase functionality
   - Inventory updates

**Expected Test Results:**

```
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        ~2-3 s
```

**Test Coverage Goals:**
- Auth Service: 85%+
- Sweet Service: 80%+
- Controllers: 75%+
- Routes: 70%+

**Note**: Some tests require the server to not be running, as they start their own test server instance. If you encounter port conflicts, stop the development server first.

### Test Files

- `server/tests/auth.test.ts` - Authentication tests
- `server/tests/sweets.test.ts` - Sweets CRUD tests

### Test Strategy

Following **TDD (Test-Driven Development)**:
1. **Red**: Write failing tests first
2. **Green**: Implement minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

🤖 My AI Usage
How AI Supported the Project

I built this project myself, but I occasionally used ChatGPT as a helper—mainly for quick suggestions, clarifications, and resolving doubts during development. AI did not write the project for me, but it supported me the way a pair programmer would.

Where AI Helped

Initial Setup Ideas: I asked ChatGPT for guidance on structuring the monorepo (server + client), and it suggested some folder structures and config setups. I implemented everything myself.

TDD Guidance: ChatGPT helped me frame a few example test cases so I could follow a proper Red–Green–Refactor workflow.

Schema Suggestions: I asked for suggestions on Prisma schema structure. I manually adjusted and implemented the final schema.

Debugging Help: When I got stuck (e.g., SQLite limitations, JWT issues, Prisma filters), I used ChatGPT to understand the problem better and brainstorm fixes.

Code Quality Tips: Sometimes I asked, “Is there a cleaner way to do this?” and ChatGPT suggested optimizations that I then implemented in my own style.

Frontend Hints: For React components and TypeScript typing, I used ChatGPT to clarify concepts—not to copy code.

Reflection

Using AI improved my workflow, but the project was fully built, structured, tested, and refined by me. AI acted only as:

a troubleshooting assistant,

a brainstorming partner,

and a reference for best practices.

This helped me work faster without compromising on understanding or originality.

👤 Author


Developed by me as part of a technical assessment, following TDD principles and modern development practices. AI (ChatGPT) was used lightly for guidance, but all implementation and decisions were my own.

