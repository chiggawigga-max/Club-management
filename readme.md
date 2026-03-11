diff --git a/readme.md b/readme.md
index ea84c8ec9a187704e3566b94179bd94644d6e512..e68c18d4952a696e648cddfe06b624f0270c36c9 100644
--- a/readme.md
+++ b/readme.md
@@ -1,7 +1,103 @@
-The Club Management System is a full-stack web application designed to simplify the management of club members, events, and volunteer activities. The platform enables administrators to efficiently organize club operations while providing members with a centralized interface to participate in events and view their responsibilities.
+# Club Management Website (MERN)
 
-The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows a RESTful API architecture for efficient communication between the frontend and backend. It supports role-based access control (RBAC), allowing administrators to manage member profiles, create and schedule events, assign volunteer duties, and monitor participation.
+This repository now includes a practical **starter scaffold** for a personal club management project using the MERN stack.
 
-Members can browse upcoming events, register for activities, and track their engagement within the club. Volunteers are able to view assigned tasks and schedules through a personalized dashboard. The system also includes reporting features that provide insights into event participation, member activity, and volunteer contributions.
+## Included Stack
 
-This project demonstrates key full-stack development concepts, including CRUD operations, authentication with JWT, API integration, database modeling with MongoDB, and responsive UI development using React. The system provides a scalable and efficient digital solution for managing club activities and improving organizational coordination.
\ No newline at end of file
+- **Frontend:** React + Vite + React Router + Axios
+- **Backend:** Node.js + Express + Mongoose
+- **Auth:** JWT + role-based middleware
+- **Database:** MongoDB
+
+## Project Structure
+
+```text
+club-management/
+├── client/
+│   ├── src/
+│   │   ├── pages/
+│   │   ├── services/
+│   │   ├── App.jsx
+│   │   └── main.jsx
+│   ├── index.html
+│   └── package.json
+├── server/
+│   ├── config/
+│   ├── controllers/
+│   ├── middleware/
+│   ├── models/
+│   ├── routes/
+│   ├── .env.example
+│   ├── package.json
+│   └── server.js
+└── package.json
+```
+
+## Core Models
+
+- `User`: auth login/register + role (`admin`, `member`, `volunteer`)
+- `Member`: club profile data (skills, availability)
+- `Event`: event details + participants
+- `Assignment`: volunteer task assignment per event
+
+## API Endpoints Included
+
+### Auth
+- `POST /api/auth/register`
+- `POST /api/auth/login`
+
+### Members
+- `POST /api/members` (admin)
+- `GET /api/members`
+- `GET /api/members/:id`
+- `PUT /api/members/:id` (admin)
+- `DELETE /api/members/:id` (admin)
+
+### Events
+- `POST /api/events` (admin)
+- `GET /api/events`
+- `GET /api/events/:id`
+- `PUT /api/events/:id` (admin)
+- `DELETE /api/events/:id` (admin)
+- `POST /api/events/register`
+
+### Assignments
+- `POST /api/assignments` (admin)
+- `GET /api/assignments`
+- `DELETE /api/assignments/:id` (admin)
+
+## Quick Start
+
+1. Install dependencies:
+
+```bash
+npm run install:all
+```
+
+2. Create env file:
+
+```bash
+cp server/.env.example server/.env
+```
+
+3. Start backend:
+
+```bash
+npm run dev:server
+```
+
+4. Start frontend (new terminal):
+
+```bash
+npm run dev:client
+```
+
+## Suggested Next Steps
+
+1. Add input validation with `zod` or `express-validator`.
+2. Build Login/Register UI and store JWT securely.
+3. Add dashboard charts (participation, volunteer hours).
+4. Add unique features:
+   - smart volunteer recommendation by skills
+   - attendance via QR code
+   - event chat with Socket.io
