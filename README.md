\# 🚀 TaskFlow – Premium Task Management Application



TaskFlow is a modern, full-stack Task Management Kanban application designed to streamline task organization and workflow management. Built with a premium React frontend and a scalable Node.js + Express backend, the application delivers a seamless user experience with secure authentication, dynamic task tracking, and real-time productivity insights.



\---



\## 🌐 Live Application



\### Frontend



https://task-manager-pi-six.vercel.app



\### Backend API



https://task-manager-3byf.onrender.com



\### API Base URL



https://task-manager-3byf.onrender.com/api



\---



\## 🔐 Demo Credentials



Use the following credentials to explore the application:



\*\*Email:\*\* \[development@gmail.com](mailto:development@gmail.com)



\*\*Password:\*\* development@123



\---



\## ✨ Key Features



\### 🔒 Authentication \& Security



\* User Registration \& Login

\* JWT Authentication

\* Protected Routes

\* Password Encryption using bcryptjs

\* Secure Authorization Middleware

\* Persistent User Sessions



\### 📋 Task Management



\* Create Tasks

\* Edit Tasks

\* Delete Tasks

\* Update Task Status

\* Manage Task Priorities

\* Dynamic Task Search

\* Priority-Based Filtering



\### 🧩 Kanban Workflow



Organize tasks efficiently using a drag-and-drop inspired Kanban board:



\* 📝 To Do

\* 🚧 In Progress

\* ✅ Completed



\### 📊 Dashboard Analytics



Track productivity with real-time metrics:



\* Total Tasks

\* Pending Tasks

\* Tasks Under Review

\* Completed Tasks



\### 🎨 Modern User Interface



\* Fully Responsive Design

\* Clean and Professional Layout

\* Modern Modal Components

\* Interactive Kanban Board

\* Smooth User Experience

\* Custom Confirmation Dialogs



\---



\## 🛠️ Technology Stack



\### Frontend



\* React.js

\* Vite

\* Tailwind CSS

\* Axios

\* Lucide React Icons



\### Backend



\* Node.js

\* Express.js

\* Sequelize ORM

\* MySQL



\### Authentication \& Validation



\* JSON Web Tokens (JWT)

\* bcryptjs

\* express-validator



\---



\## 📁 Project Structure



```bash

Task\_manager\_app/

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

│   └── package.json

│

├── README.md

└── .gitignore

```



\---



\## ⚙️ Local Development Setup



\### Prerequisites



Make sure the following are installed:



\* Node.js

\* MySQL

\* Git



\---



\### Backend Setup



\#### 1. Navigate to Backend Directory



```bash

cd backend

```



\#### 2. Install Dependencies



```bash

npm install

```



\#### 3. Configure Environment Variables



Create a `.env` file inside the backend folder:



```env

PORT=5000

NODE\_ENV=development



DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=

DB\_NAME=task\_manager

DB\_PORT=3306



JWT\_SECRET=your\_jwt\_secret\_key

```



\#### 4. Start Backend Server



```bash

npm start

```



Backend will run at:



```text

http://localhost:5000

```



\---



\### Frontend Setup



\#### 1. Navigate to Frontend Directory



```bash

cd frontend

```



\#### 2. Install Dependencies



```bash

npm install

```



\#### 3. Configure Environment Variables



Create a `.env` file:



```env

VITE\_API\_BASE\_URL=http://localhost:5000/api

```



\#### 4. Start Frontend



```bash

npm run dev

```



Frontend will run at:



```text

http://localhost:5173

```



\---



\## 📡 API Endpoints



\### Authentication



| Method | Endpoint           | Description   |

| ------ | ------------------ | ------------- |

| POST   | /api/auth/register | Register User |

| POST   | /api/auth/login    | Login User    |



\### Tasks



| Method | Endpoint       | Description   |

| ------ | -------------- | ------------- |

| GET    | /api/tasks     | Get All Tasks |

| POST   | /api/tasks     | Create Task   |

| PUT    | /api/tasks/:id | Update Task   |

| DELETE | /api/tasks/:id | Delete Task   |



\---



\## ☁️ Deployment



| Service  | Platform |

| -------- | -------- |

| Frontend | Vercel   |

| Backend  | Render   |

| Database | MySQL    |



\---



\## 📸 Project Highlights



✅ Production-Ready Full Stack Application



✅ Secure JWT Authentication



✅ RESTful API Architecture



✅ Responsive Modern UI



✅ Kanban-Based Task Workflow



✅ Scalable Backend Structure



✅ MySQL Database Integration



✅ Clean Code \& Modular Design



\---



\## 👨‍💻 Developer



\*\*Janardhan Ulavala\*\*



LinkedIn:

https://www.linkedin.com/in/ulavala-janardhan-bb1ba1221



\---



\## 📄 License



This project was developed for learning purposes, technical assessments, and professional portfolio demonstrations.



