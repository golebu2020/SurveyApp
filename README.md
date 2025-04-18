# Survey Management System

A full-stack survey management application with role-based access control built with Rails API and React.

## Features

- 🔐 JWT Authentication
- 👥 Role-based permissions (Admin/Manager/User)
- 📝 Survey creation with questions
- 📊 Assignment tracking
- 🔍 Search functionality
- 📱 Responsive UI

## Tech Stack

**Backend:**  
Ruby on Rails, PostgreSQL, Devise, Pundit

**Frontend:**  
React, TypeScript, Chakra UI, React Query

## Setup

1. Clone repo:

```bash
git clone https://github.com/golebu2020/SurveyApp.git
cd survey-app
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files:

### Backend (API) Variables

Create `api/.env` file with:

```env
DATABASE_URL=postgres://postgres:password@db:5432/survey_app_development
SECRET_KEY_BASE=your_rails_secret_key_here
REACT_APP_API_URL=http://localhost:3000
```

## Running the App

Ensure that you have docker desktop and docker installed on your machine. If that is confirmed, then do then run the following commands:

```bash
docker-compose up -build
```

Frontend Endpoint: `http://localhost:3001`
Backend Endpoint: `http://localhost:3000`

### Running Tests

Backend:

```bash
docker-compose exec web bundle exec rspec
```

### Seeding Data

```bash
docker-compose exec web bundle exec rails db:seed
```

## API Documentation

### User Registration

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "admin@test.com", "password": "password", "role": "admin"}}'
```

User Login

```bash curl -X POST http://localhost:3000/users/sign_in \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "admin@test.com", "password": "password"}}'
```

### Creating Survey (as Admin)

```bash
curl -X POST http://localhost:3000/api/v1/surveys \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"survey": {"name": "Employee Feedback", "description": "Quarterly feedback", "status": "NEW", "created_by": 1}}'
```

### Creating questions for the specific survey

```bash
curl -X POST http://localhost:3000/api/v1/surveys/1/questions \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"question": {"label": "How satisfied are you?", "data_type": "scale", "info": "Rate 1-10", "survey_id": 2}}'
```

### Assign Survey to User:

First, register a regular user if you haven't:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "user@test.com", "password": "password", "role": "user"}}'
```

Then Assign:

```bash
curl -X POST http://localhost:3000/api/v1/survey_assignments \
 -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"survey_assignment": {"survey_id": 1, "assigned_to": 2, "assigned_by": 1}}'
```

### Test User Access to Assigned Survey:

````bash curl -X POST http://localhost:3000/users/sign_in \
 -H "Content-Type: application/json" \
 -d '{"user": {"email": "user@test.com", "password": "password"}}'```

```bash curl -X GET http://localhost:3000/api/v1/surveys \
 -H "Authorization: Bearer YOUR_USER_TOKEN"```
````

### Test Manager Permissions

````bash curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "manager@test.com", "password": "password", "role": "manager"}}'```

```bash curl -X POST http://localhost:3000/users/sign_in \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "manager@test.com", "password": "password"}}'```

```bash curl -X POST http://localhost:3000/api/v1/surveys \
  -H "Authorization: Bearer YOUR_MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"survey": {"name": "Manager Survey", "description": "Team feedback", "status": "NEW", "created_by": 3}}'```

```bash curl -X DELETE http://localhost:3000/api/v1/surveys/1 \
  -H "Authorization: Bearer YOUR_MANAGER_TOKEN"```
````

### Seach Functionality

````bash curl -X GET "http://localhost:3000/api/v1/surveys?q[name_cont]=Employee" \
  -H "Authorization: Bearer YOUR_MANAGER_TOKEN"```

```curl -X GET "http://localhost:3000/api/v1/surveys?q[name_cont]=Feedback" \
  -H "Authorization: Bearer YOUR_USER_TOKEN"```
````
