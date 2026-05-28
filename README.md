\# Task Manager Application



A full-stack Task Manager application built using React.js for the frontend and Node.js + Express.js for the backend. The application allows users to register, login, and manage tasks across different stages such as Todo, In Progress, and Done.



\---



\# Live Demo



\## Frontend Deployment



(Add your frontend deployed link here)



\## Backend Deployment



(Add your backend deployed link here)



\---



\# GitHub Repository



(Add your GitHub repository link here)



\---



\# Tech Stack



\## Frontend



\* React.js

\* Vite

\* React Router DOM

\* Axios

\* CSS / Bootstrap



\## Backend



\* Node.js

\* Express.js

\* JWT Authentication

\* bcryptjs



\## Database



\* MySQL (XAMPP)



\## API Testing



\* Postman



\---



\# Features



\## Authentication



\* User Registration

\* User Login

\* JWT-based Authentication

\* Protected Routes



\## Task Management



\* Create Tasks

\* Update Tasks

\* Delete Tasks

\* Change Task Status

\* Separate Task Stages:



&#x20; \* Todo

&#x20; \* In Progress

&#x20; \* Done



\## UI Features



\* Responsive Design

\* Loading States

\* Error Handling

\* Clean Dashboard Layout



\---



\# Project Structure



```plaintext

task\_manager/

│

├── backend/

│   ├── config/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   ├── utils/

│   ├── server.js

│   └── package.json

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   └── App.jsx

│   │

│   └── package.json

│

├── README.md

└── .gitignore

```



\---



\# Installation \& Setup



\## Clone Repository



```bash

git clone <your-repository-link>

cd task\_manager

```



\---



\# Backend Setup



\## Navigate to backend folder



```bash

cd backend

```



\## Install dependencies



```bash

npm install

```



\## Create `.env` file



```env

PORT=5000



DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=

DB\_NAME=task\_manager



JWT\_SECRET=your\_secret\_key

```



\## Start backend server



```bash

npm start

```



\---



\# Frontend Setup



\## Navigate to frontend folder



```bash

cd frontend

```



\## Install dependencies



```bash

npm install

```



\## Start frontend server



```bash

npm run dev

```



\---



\# API Endpoints



\## Authentication APIs



\### Register User



```http

POST /api/auth/register

```



\### Login User



```http

POST /api/auth/login

```



\---



\# Task APIs



\### Get All Tasks



```http

GET /api/tasks

```



\### Create Task



```http

POST /api/tasks

```



\### Update Task



```http

PUT /api/tasks/:id

```



\### Delete Task



```http

DELETE /api/tasks/:id

```



\---



\# Assumptions



\* Every user can only manage their own tasks.

\* JWT token is stored on the client side after login.

\* MySQL server is running locally using XAMPP.

\* Backend and frontend are hosted separately.



\---



\# Technical Decisions



\* React.js was chosen for building a responsive and component-based frontend.

\* Express.js was used to create RESTful APIs.

\* JWT authentication was implemented for secure user sessions.

\* MySQL was selected as the relational database for structured task management.

\* Axios was used for API communication between frontend and backend.



\---



\# Tradeoffs



\* Local MySQL setup was used for simplicity during development.

\* Minimal UI animations were implemented to focus on functionality and performance.

\* Redux was not used since Context API/local state management was sufficient for the project scope.



\---



\# Future Improvements



\* Drag and Drop Task Management

\* Task Priority Levels

\* Due Dates \& Notifications

\* Team Collaboration Features

\* Dark Mode

\* File Attachments

\* Real-time Updates using Socket.io



\---



\# Deployment Platforms



\## Frontend



\* Vercel / Netlify



\## Backend



\* Render / Railway



\---



\# Author



Janardhan Ulavala



\* Full Stack Web Developer

\* React.js | Node.js | Express.js | MySQL



\---



