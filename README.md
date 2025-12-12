# WissenForge

A lightweight Learning & Development Portal built with React (Vite) and Node.js (Express + SQLite).

## Features
- **Role-based Access**: Employee, Admin, Super Admin.
- **Training Management**: Create, Assign, Approve (Mandatory).
- **Enrollment**: Employees can enroll in open trainings.
- **Profile**: View training history and status.
- **Dashboard**: Role-specific overview.

## Prerequisites
- Node.js (v16+)
- npm

## Setup & Run

### 1. Backend
```bash
cd server
npm install
npm run seed  # Seeds the database with initial users/trainings
npm start
```
Server runs on `http://localhost:3000`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Super Admin | super@wissen.com | password123 |
| Admin | admin@wissen.com | password123 |
| Employee | john@wissen.com | password123 |

## Project Structure
- `client/`: React Frontend
- `server/`: Express Backend
- `database.sqlite`: SQLite Database (created on start)
