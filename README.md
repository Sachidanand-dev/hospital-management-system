# 🏥 Full Stack Hospital Management System

A modern, robust, and responsive web application for managing hospital operations. Built with the **MERN Stack** (MongoDB, Express.js, React, Node.js), this system facilitates seamless interaction between patients, doctors, and administrators.

![Hospital Management System Banner](https://via.placeholder.com/1200x400?text=Hospital+Management+System)

## 🚀 Features

### 🩺 For Patients

- **User Dashboard**: Personalized welcome screen with appointment stats (Upcoming, Total Visits).
- **Book Appointments**: Easy-to-use form to schedule visits with available doctors.
- **Appointment History**: View past and upcoming appointments with status tracking.
- **Doctor Browser**: View doctor details and specializations (integrated into booking).

### 👨‍⚕️ For Doctors

- **Doctor Dashboard**: specialized view with "Today's Schedule" and quick statistics.
- **Appointment Management**: Accept, Reject, or Mark appointments as Completed.
- **Patient Status**: View patient details (Name, Age) and visit reasons.

### 🛡️ For Admins

- **System Overview**: Monitor platform activity.
- **User Management**: Manage doctors and patient accounts.
- _(In Progress)_: Advanced reporting and configuration.

### 💻 Technical Highlights

- **Authentication**: Secure JWT-based auth with Access & Refresh tokens.
- **Role-Based Access Control (RBAC)**: Protected routes ensuring data security per user role.
- **UI/UX**: Premium "Glassmorphism" design using **Tailwind CSS v4** and CSS animations.
- **API**: RESTful API architecture.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons), Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Security**: JSON Web Tokens (JWT), BCrypt (hashing), Helmet, CORS.

---

## ⚙️ Installation & Setup

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository

```bash
git clone <repository_url>
cd full-stack-hospital-management
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in `server/` with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital_db  # Or your Atlas URI
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
CLIENT_URL=http://localhost:5173
node_env=development
ADMIN_EMAIL=admin@hospital.com
```

Start the server:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in `client/` (optional, defaults are set in code):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the client development server:

```bash
npm run dev
# Client runs on http://localhost:5173
```

---

## 📖 API Documentation

The backend exposes the following main endpoints:

### Auth

- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate user.
- `POST /api/auth/logout` - Clear session.
- `POST /api/auth/refresh-token` - Rotate access tokens.

### Appointments

- `GET /api/appointments` - Get current user's appointments.
- `POST /api/appointments` - Book a new appointment.
- `PATCH /api/appointments/:id/status` - Update status (Doctor only).
- `PATCH /api/appointments/:id/cancel` - Cancel appointment.

### Doctors

- `GET /api/doctors` - List all doctors.

---

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License.
