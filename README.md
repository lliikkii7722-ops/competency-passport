# Competency Passport

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-blue)](https://competency-passport.netlify.app)
[![Backend API](https://img.shields.io/badge/API-Render-purple)](https://competency-passport-api.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)]()
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen)]()
[![Database](https://img.shields.io/badge/Database-MySQL-orange)]()
[![Security](https://img.shields.io/badge/Security-JWT-black)]()
[![REST API](https://img.shields.io/badge/API-REST-red)]()
[![Deployment](https://img.shields.io/badge/Deployment-Netlify%20%7C%20Render-blueviolet)]()
[![AI Tools](https://img.shields.io/badge/AI-Skill%20Gap%20Analysis-purple)]()
[![Mock Interview](https://img.shields.io/badge/Feature-Mock%20Interview-success)]()


A full-stack portfolio and competency management platform designed for students and job seekers to build professional digital profiles, showcase achievements, and prepare for placements through AI-assisted tools.

---

## Live Demo

Frontend:  
https://competency-passport.netlify.app

Backend API:  
https://competency-passport-api.onrender.com

---

# Overview

Competency Passport helps users create a structured professional profile containing:

- Personal profile information
- Education details
- Experience details
- Skills management
- Project showcase
- Certificate uploads
- Achievement badge system
- AI skill gap analysis
- Mock interview simulator

The platform is built to support placement preparation and recruiter-ready profile creation.

---

# Features

## Authentication System

- User Registration
- User Login
- JWT Authentication
- Secure API Authorization
- Persistent Session Management

## Profile Management

- Public professional profile
- Resume-style dashboard
- Social profile integration
- Profile completion tracking
- Public shareable profile link

## Education Module

- Add and manage education records
- CGPA and academic information tracking
- Achievement-based scoring

## Experience Module

- Internship and work experience management
- Role descriptions and company details
- Timeline management

## Skills Module

- Skill categorization
- Skill proficiency ratings
- Dynamic progress visualization

## Projects Module

- Project showcase section
- Technology stack display
- Project descriptions and management

## Certificates Module

- Certificate upload support
- Certificate metadata management
- File storage integration

## AI Skill Gap Analyzer

- Analyze job descriptions
- Compare user profile against target roles
- Identify missing competencies
- Placement preparation support

## Mock Interview Simulator

- Technical interview mode
- Behavioral interview mode
- System design interview mode
- Difficulty-based interview generation

## Achievement Badge System

- Gamified profile completion
- Badge unlock system
- User level progression
- Progress tracking dashboard

---

# Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Router
- Tailwind CSS

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA
- REST APIs

## Database

- MySQL

## Deployment

### Frontend Hosting
- Netlify

### Backend Hosting
- Render

### Database Hosting
- Railway MySQL

---

# System Architecture

Frontend (React + Vite)  
↓  
REST API Communication  
↓  
Spring Boot Backend  
↓  
MySQL Database (Railway)

---

## Application Screenshots

<img width="1536" height="1024" alt="ChatGPT Image May 23, 2026, 01_53_50 PM" src="https://github.com/user-attachments/assets/5201ff6d-f57e-4e06-b947-699eede36659" />

---

# Installation

## Clone Repository

```bash
git clone https://github.com/lliikkii7722-ops/competency-passport.git
cd competency-passport
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
mvn spring-boot:run
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_URL=https://competency-passport-api.onrender.com
```

## Backend Environment Variables

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
FRONTEND_URL=
ALLOWED_ORIGINS=
FILE_BASE_URL=
```

---

# API Modules

| Module | Description |
|---|---|
| Authentication | Login and registration |
| Profile | User profile management |
| Education | Academic records |
| Experience | Work and internship data |
| Skills | Skill management |
| Projects | Portfolio projects |
| Certificates | File uploads |
| AI Analyzer | Skill gap analysis |
| Mock Interview | Interview preparation |
| Badges | Achievement tracking |

---

# Deployment

## Frontend Deployment

- Netlify

## Backend Deployment

- Render

## Database

- Railway MySQL

---

# Future Enhancements

- Real AI integration using OpenAI/Gemini
- ATS resume scoring
- Recruiter dashboard
- Resume PDF export
- Email verification
- AI-generated interview feedback
- Multi-user public portfolios
- Admin analytics dashboard

---

# Author

Likhitha HK

GitHub:  
https://github.com/lliikkii7722-ops

---

# License

This project is developed for educational, placement preparation, and portfolio purposes.
