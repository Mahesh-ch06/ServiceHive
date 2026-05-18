# Smart Leads Dashboard

Smart Leads Dashboard is a production-ready MERN application for managing inbound leads with role-based access, advanced filtering, and a modern SaaS-style interface.

## Features
- JWT authentication with admin and sales roles
- Lead CRUD with role-based delete permissions
- Advanced filtering, search, sorting, and pagination
- CSV export for filtered lead lists
- Reusable component system and clean architecture
- Dockerized development and deployment

## Tech Stack
Frontend: React, TypeScript, TailwindCSS, React Router, TanStack Query, Zustand, React Hook Form, Zod
Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt

## Local Setup
1. Copy environment files.
   - server/.env.example -> server/.env
   - client/.env.example -> client/.env
2. Install dependencies.
   - npm install
3. Run locally.
   - npm run dev:server
   - npm run dev:client

Frontend runs on localhost:5173
Backend runs on localhost:5000

## Live Demo
- https://servicehive-cap8.onrender.com

## Docker
- docker compose up --build

## Environment Variables
Server:
- PORT
- MONGO_URI
- JWT_SECRET
- ADMIN_EMAIL
- JWT_EXPIRES_IN
- CLIENT_URL (comma-separated list of allowed frontend origins, e.g. http://localhost:5173,https://your-vercel-app.vercel.app)

Client:
- VITE_API_URL

## Docker
The project already includes a `docker-compose.yml` and `Dockerfile` for both `client` and `server`.

To run locally with Docker:
```bash
docker compose up --build
```

The services will be available on:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Vercel / deployed frontend
For Vercel or another hosted frontend, set `VITE_API_URL` to your backend URL, for example:
```env
VITE_API_URL=https://your-backend-url.com
```

If the backend is also deployed separately, configure the backend service with:
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `CLIENT_URL` (must match the deployed frontend URL)
- `JWT_EXPIRES_IN`

## API Documentation
Auth
- POST /api/auth/register
- POST /api/auth/login

Leads
- GET /api/leads
- GET /api/leads/export
- GET /api/leads/:id
- POST /api/leads
- PATCH /api/leads/:id
- DELETE /api/leads/:id (admin only)

Query Parameters
- status: New | Contacted | Qualified | Lost
- source: Website | Instagram | Referral
- search: string (name or email)
- sort: latest | oldest
- page: number
- limit: number (default 10)

Response Format
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {},
  "pagination": {}
}

## Folder Structure
client/
  src/
    api/
    components/
      common/
      forms/
      layout/
      leads/
    hooks/
    pages/
    routes/
    store/
    types/
    utils/
    validations/

server/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    types/
    utils/
    validations/
    constants/

## Deployment Notes
- Build client with npm run build
- Build server with npm run build
- Use Docker for containerized deployment

## Screenshots
Add dashboard screenshots here.
