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
