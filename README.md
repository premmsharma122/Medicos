# 🏥 Medicos — Full-Stack Hospital Management System

> Book a doctor in under a minute. Manage a whole hospital from one dashboard.

![Stack](https://img.shields.io/badge/MERN-Stack-green)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20RBAC-blue)
![Storage](https://img.shields.io/badge/Media-Cloudinary-orange)
![Status](https://img.shields.io/badge/Status-Hackathon%20Build-purple)

**🔗 Live Demo:** `add soon..` | **🎥 Demo Video:** `add soon..`

---

## 📌 Table of Contents
1. [The Problem](#-the-problem)
2. [Our Solution](#-our-solution)
3. [Key Features](#-key-features)
4. [Demo Credentials](#-demo-credentials)
5. [Tech Stack](#-tech-stack)
6. [Architecture](#-architecture)
7. [Data Model](#-data-model)
8. [API Reference](#-api-reference)
9. [Folder Structure](#-folder-structure)
10. [Getting Started](#-getting-started)
11. [Security Design](#-security-design)
12. [Challenges & Learnings](#-challenges--learnings)
13. [Roadmap](#-roadmap)
14. [Team](#-team)

---

## 🚨 The Problem
- Patients call or walk in just to learn whether a doctor is free.
- Hospital staff track schedules in registers or spreadsheets, causing double bookings and lost records.
- Admins have no single view of doctors, patients, and appointments.

## 💡 Our Solution
Medicos gives each role exactly what it needs:

| Role | What they get |
| --- | --- |
| **Patient** | Browse doctors by speciality, see live slots, book / cancel, manage profile |
| **Doctor** | Availability toggle and appointment visibility |
| **Admin** | Add doctors, control availability, view all appointments and patients, cancel bookings |

---

## ✨ Key Features
- **Admin Control Panel** — manage doctor profiles, availability, patient records, cancellations
- **Real-Time Appointment Booking** — slot-based booking against live availability
- **Secure Multi-Role Auth** — JWT + bcrypt with role-based middleware (RBAC)
- **Patient Profiles** — edit details, upload photo (Cloudinary)
- **Doctor Management** — specialties, background, fees, images
- **Payment-Ready** — schema prepared for Razorpay integration

---

## 🔑 Demo Credentials
> Put throwaway accounts here so judges can test in seconds. Never use real data.

| Role | Email | Password |
| --- | --- | --- |
| Patient | `patient@demo.com` | `demo1234` |
| Admin | `admin@demo.com` | `admin1234` |

---

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React.js (Vite), React Router, Axios, Context API, Tailwind CSS |
| **Admin Portal** | React.js (Vite), Context API |
| **Backend** | Node.js, Express.js, REST APIs, custom middleware |
| **Database** | MongoDB Atlas, Mongoose |
| **Security** | JWT, bcrypt, role-based middleware |
| **Storage** | Cloudinary, Multer |
| **Tooling** | CORS, dotenv, Nodemon, Postman, Git/GitHub |

---

## 🏗 Architecture

```text
[ Patient Browser ]      [ Admin Browser ]
        │                        │
        ▼                        ▼
┌────────────────┐      ┌────────────────┐
│ Frontend (SPA) │      │ Admin Portal   │
└───────┬────────┘      └───────┬────────┘
        └──────────┬────────────┘
                   ▼  REST + JWT (Axios)
        ┌─────────────────────────┐
        │  Express API            │
        │  authUser / authAdmin   │
        │  Controllers            │
        └──────┬───────────┬──────┘
               ▼           ▼
        ┌───────────┐ ┌───────────┐
        │ MongoDB   │ │ Cloudinary│
        │ Atlas     │ │ (images)  │
        └───────────┘ └───────────┘
```

**Request flow (booking):** `Login → JWT issued → Browse doctors → Pick slot → POST /book-appointment → authUser verifies token → check slot free → save appointment → update doctor's booked slots`

---

## 🗄 Data Model

```text
User         { name, email, password(hash), image, phone, address, gender, dob }
Doctor       { name, email, password(hash), image, speciality, degree, experience,
               about, available, fees, address, slots_booked{date:[times]}, date }
Appointment  { userId→User, docId→Doctor, slotDate, slotTime, userData, docData,
               amount, date, cancelled, payment, isCompleted }
```

> Adjust field names to match your Mongoose schemas. The `payment` flag plus `amount` is what makes the app Razorpay-ready.

---

## 📡 API Reference
> Align the paths below with your actual route files.

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/user/register` | — | Register patient |
| POST | `/api/user/login` | — | Login, returns JWT |
| GET | `/api/user/get-profile` | User | Fetch profile |
| POST | `/api/user/update-profile` | User | Update details + photo |
| POST | `/api/user/book-appointment` | User | Book a slot |
| GET | `/api/user/appointments` | User | List my appointments |
| POST | `/api/user/cancel-appointment` | User | Cancel and free the slot |
| GET | `/api/doctor/list` | — | Public doctor list |
| POST | `/api/admin/login` | — | Admin login |
| POST | `/api/admin/add-doctor` | Admin | Add doctor (multipart) |
| POST | `/api/admin/change-availability` | Admin | Toggle availability |
| GET | `/api/admin/appointments` | Admin | All appointments |
| POST | `/api/admin/cancel-appointment` | Admin | Cancel any appointment |
| GET | `/api/admin/dashboard` | Admin | Counts and latest bookings |

Send the token in the header: `Authorization: Bearer <token>` (or `token: <jwt>` if that is what your middleware reads).

---

## 📁 Folder Structure

```text
Medicos
├─ admin/                  # Admin portal (Vite + React)
│  └─ src/AdminContext.jsx
├─ frontend/               # Patient app
│  ├─ components/          # Navbar, Header, Banner, TopDoctors, SpecialityMenu...
│  ├─ context/AppContext.jsx
│  └─ pages/               # Home, Doctors, Appointment, MyAppointments, MyProfile...
└─ backend/
   ├─ config/              # mongodb.js, cloudinary.js
   ├─ controllers/         # admin, doctor, user
   ├─ middlewares/         # authAdmin, authUser, multer
   ├─ models/              # appointment, doctor, user
   └─ routes/              # adminRoute, doctorRoute, userRoute
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js v18+ (v16 works), MongoDB Atlas account, Cloudinary account.

### 1. Clone
```bash
git clone https://github.com/your-username/medicos.git
cd medicos
```

### 2. Backend
```bash
cd backend
npm install
```
Create `backend/.env`:
```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
ADMIN_EMAIL=admin@demo.com
ADMIN_PASSWORD=admin1234
```
```bash
npm run server
```

### 3. Frontend
```bash
cd ../frontend && npm install && npm run dev
```

### 4. Admin Portal
```bash
cd ../admin && npm install && npm run dev
```

### Quick Run (all three)
Open three terminals and run the commands above. Defaults: backend `:4000`, frontend `:5173`, admin `:5174`.

### Troubleshooting
| Problem | Fix |
| --- | --- |
| Mongo connection error | Whitelist your IP in Atlas Network Access |
| Image upload fails | Check Cloudinary keys and that the form uses `multipart/form-data` |
| CORS error | Allow both frontend and admin origins in `cors()` |
| 401 on every request | Confirm the token header name matches the middleware |

---

## 🔒 Security Design
- Passwords hashed with **bcrypt**; never stored or returned in plain text
- **JWT** verified in middleware; separate `authUser` and `authAdmin` guards enforce RBAC
- Secrets live in `.env` (gitignored)
- Uploads pass through Multer, then go to Cloudinary (no files stored on the server)

**Hardening checklist (recommended next):**
- [ ] `helmet` and `express-rate-limit` on auth routes
- [ ] Input validation (Joi / Zod / express-validator)
- [ ] Short-lived tokens with refresh flow
- [ ] File type and size limits in Multer
- [ ] Remove admin credentials from env before production; use a seeded admin user

---

## 🧠 Challenges & Learnings
- **Double booking:** storing booked slots per doctor by date and checking before saving prevents two patients taking one slot. A MongoDB transaction or atomic `$addToSet` update would make this race-proof.
- **Role separation:** two independent portals sharing one API kept admin UI out of the patient bundle.
- **Media handling:** moving images to Cloudinary kept the backend stateless and deploy-friendly.
- **Consistency:** cancelling must both flag the appointment and free the doctor's slot; handle both in one controller flow.

---

## 🗺 Roadmap
- [ ] Razorpay payments (schema ready)
- [ ] Doctor dashboard (earnings, today's patients, mark completed)
- [ ] Email / SMS reminders (Nodemailer, Twilio)
- [ ] Reschedule flow
- [ ] Search and filters (speciality, fee, availability)
- [ ] Prescriptions and medical history uploads
- [ ] Analytics charts for admin
- [ ] Docker + CI/CD (GitHub Actions)
- [ ] Unit and API tests (Jest, Supertest)

---

## 🌍 Impact
Fewer phone calls, no double bookings, and one source of truth for hospital operations, which scales from a small clinic to a multi-doctor hospital.

---

## 👥 Team
| Name | Role | Links |
| --- | --- | --- |
| Prem Sharma | Full-stack developer | [GitHub](#https://github.com/premmsharma122) · [LinkedIn](#https://www.linkedin.com/in/prem-sharma-0a4b62291/) |

---

## 📜 License
MIT. See `LICENSE`.

⭐ If you like this project, star the repo!
