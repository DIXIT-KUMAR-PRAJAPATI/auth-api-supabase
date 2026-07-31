# Auth API using Express & Supabase

## Features

- User Signup
- User Login
- JWT Authentication
- Protected Route
- Swagger Documentation

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

## Run Project

```bash
node app.js
```

## API Endpoints

### Signup

POST `/auth/signup`

### Login

POST `/auth/login`

### Profile

GET `/profile`

Authorization Header:

```
Bearer <access_token>
```

## Swagger

```
http://localhost:3000/api-docs
```