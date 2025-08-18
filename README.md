# Medicos : A Full Stack Web Application which handles a full hospital management system.

### Features  :

-> It has an admin control panel which controls doctors availability and patients management.  

-> A **real time slot booking system** for patients and also adjust, cancel appointments by their comfort.  

-> A **authentication verify** patients and admin control also.  

-> Patients can also manage their profile by adding details and **Profile Photo**.  

-> Admin control has access to all doctors like **adding full details of doctor background and image, availability of each doctor and manage cancellation of appointments**.  

-> (This web app also supports **Payment gateway** but currently we do not have a Razorpay account to implement it, but we manage all necessary things required for a payment gateway, so **in future when we make it production ready** we can implement it.)

### Tech Stacks:

-> **Frontend:** React.js  
   - Component-based UI development  
   - React Router for client-side routing  
   - Axios or Fetch API for HTTP requests  
   - State management with useState, useEffect, and potentially Context API or Redux  
   - Form handling and validation using controlled components or libraries like Formik/Yup  

-> **Backend:** Node.js with Express.js  
   - RESTful API development  
   - Middleware for authentication, logging, and error handling  
   - Routing to handle API endpoints for patients, doctors, appointments, etc.  
   - Body parsing using `express.json()` and `express.urlencoded()`  

-> **Database:** MongoDB Atlas with Mongoose  
   - Schema definition using Mongoose models  
   - CRUD operations for users, doctors, appointments  
   - Relationships via referencing ObjectIds  
   - Aggregation pipelines for advanced queries if needed  

-> **Authentication & Security:**  
   - JWT (JSON Web Tokens) for secure authentication  
   - Password hashing with bcrypt  
   - Role-based access control for admin vs patient vs doctor  

-> **File Storage & Media:**  
   - Cloudinary for storing and serving profile images or doctor images  
   - Image uploading via Multer (optional)  

-> **Payments (Future Implementation):**  
   - Razorpay integration (planned) for handling patient payments  

-> **Other Tools / Libraries:**  
   - CORS middleware to handle cross-origin requests  
   - dotenv for environment variable management  
   - Nodemon for backend development  
   - Postman or Insomnia for API testing  
   - Git/GitHub for version control  
### Folder Structure:

Medicos
│
├─ admin
│  ├─ public
│  ├─ src
│  │  └─ AdminContext.jsx
│  ├─ .gitignore
│  ├─ README.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  └─ vite.config.js
│
├─ frontend
│  ├─ components
│  │  ├─ Banner.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Header.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ RelatedDocters.jsx
│  │  ├─ SpecialityMenu.jsx
│  │  └─ TopDocters.jsx
│  │
│  ├─ context
│  │  └─ AppContext.jsx
│  │
│  └─ pages
│     ├─ About.jsx
│     ├─ Appointment.jsx
│     ├─ Contact.jsx
│     ├─ Docters.jsx
│     ├─ Home.jsx
│     ├─ Login.jsx
│     ├─ MyAppointments.jsx
│     └─ MyProfile.jsx
│
├─ backend
│  ├─ config
│  │  ├─ cloudinary.js
│  │  └─ mongodb.js
│  │
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ docterController.js
│  │  └─ userController.js
│  │
│  ├─ middlewares
│  │  ├─ authAdmin.js
│  │  ├─ authUser.js
│  │  └─ multer.js
│  │
│  ├─ models
│  │  ├─ appointmentModels.js
│  │  ├─ docterModel.js
│  │  └─ userModels.js
│  │
│  └─ routes
│     ├─ adminRoute.js
│     ├─ docterRoute.js
│     └─ userRoute.js
