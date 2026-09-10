<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# BeYourOwnHero API

A NestJS REST API for a healthy habits application: users create habits, track completed habits, and earn points for their progress.

- **Author:** Guillermina Gatti
- **Idea:** help users build healthy habits by tracking their progress and earning points.
- **Repository:** https://github.com/guillermina-gatti/BeYourOwnHero

## Stack

NestJS 12, TypeScript, PostgreSQL, Prisma 7, JWT, bcrypt, class-validator, Helmet, CORS, and throttling.

## Quick start

Prerequisites: Node.js, pnpm, and a reachable PostgreSQL database.

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env` using `.env.example`:

| Variable | Required for | Notes |
|----------|--------------|-------|
| DATABASE_URL | API, Prisma | PostgreSQL connection string |
| JWT_SECRET | API | At least 32 characters |
| JWT_EXPIRES_IN | API | Access-token lifetime |
| JWT_REFRESH_SECRET | API | At least 32 characters and different from JWT_SECRET |
| JWT_REFRESH_EXPIRES_IN | API | Refresh-token lifetime |
| CORS_ORIGIN | API | Allowed browser origin |
| PORT | API | Listening port |

Do not commit `.env`.

3. Generate the Prisma client:

```bash
pnpm prisma generate
```

4. Start the API:

```bash
pnpm start:dev
```

The API is served under `/api/v1`.

## Database

The application uses PostgreSQL with Prisma.

Models:

| Model | Description |
|-------|-------------|
| User | Registered users and their points |
| Habit | Healthy habits created by users |
| Completion | Completed habits and earned points |

Relations:

```
User
 ├── Habit
 └── Completion
```

## Authentication

All protected endpoints require:

```
Authorization: Bearer <access_token>
```

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | /api/v1/auth/register | Register a new user | Public |
| POST | /api/v1/auth/login | Authenticate and issue tokens | Public |
| GET | /api/v1/auth/me | Get the authenticated user | Bearer token |
| POST | /api/v1/auth/refresh | Generate a new access token | Public + refresh token |
| POST | /api/v1/auth/logout | Revoke the refresh token | Bearer token |

Passwords are hashed with bcrypt and refresh tokens are stored hashed.

## Habits

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | /api/v1/habits | Create a habit | Bearer token |
| GET | /api/v1/habits | List the user's habits | Bearer token |
| GET | /api/v1/habits/:id | Get one habit | Bearer token |
| PATCH | /api/v1/habits/:id | Update a habit | Bearer token |
| DELETE | /api/v1/habits/:id | Delete a habit | Bearer token |

## Completions

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | /api/v1/completions | Register a completed habit | Bearer token |
| GET | /api/v1/completions | List completed habits | Bearer token |

## Security

The API includes:

```
✓ JWT authentication
✓ bcrypt password hashing
✓ Hashed refresh tokens
✓ DTO validation
✓ Helmet
✓ CORS
✓ Rate limiting
✓ Protected user routes
```

## Verification

Authentication tests can be run with:

```bash
pnpm run test:auth
```

Build the project with:

```bash
pnpm run build
```

## Deploy handoff

Deployment requires the API environment variables above and a reachable PostgreSQL database.

A production deployment should run:

```bash
pnpm install --frozen-lockfile
pnpm prisma generate
pnpm run build
pnpm start:prod
```

The production `DATABASE_URL` must point to the PostgreSQL database used by the deployed API.

## Deploy

**API URL:** [Add deployment URL here]

## License

This project is private and currently has no published license.
