🎓 Student Project Allocation & Management System – Minimal Prototype
A minimal web-based system to automate project allocation, progress tracking, and communication between students, supervisors, and administrators.
Built with Next.js and MongoDB, using Next.js API routes for authentication and data operations.

🚀 Features (MVP)
* Student registration with project preferences (creates both user account and student record)
* Supervisor project creation
* Automatic project allocation based on preferences and supervisor capacity
* Real-time progress submission and feedback
* Notifications panel for reminders and feedback
* Role-based authentication (admin, supervisor, student)

🛠 Tech Stack
* Frontend: Next.js 14 (React), Tailwind CSS
* Backend: Next.js API Routes
* Database: MongoDB + Mongoose
* Authentication: bcryptjs for password hashing
* State Management: React Context API
* Deployment: Vercel

📂 Project Structure

/student-project-system
├── /app
│   ├── /api                     # API routes for authentication and data operations
│   │   ├── /auth
│   │   │   ├── login/           # User login
│   │   │   └── register/        # User registration
│   │   ├── /students            # Student CRUD operations
│   │   ├── /supervisors         # Supervisor operations
│   │   ├── /projects            # Project operations
│   │   ├── /allocations         # Allocation operations
│   │   └── /progress            # Progress operations
│   ├── /admin                   # Admin pages
│   │   ├── /students            # Student management
│   │   ├── /supervisors         # Supervisor management
│   │   └── /projects            # Project management
│   ├── /dashboard               # Role-based dashboard
│   ├── /login                   # Authentication page
│   ├── /register                # User registration (admin only)
│   ├── /student                 # Student pages
│   ├── /supervisor              # Supervisor pages
│   └── layout.tsx               # Root layout
├── /context
│   └── AppContext.tsx           # Global context for state
├── /hooks
│   ├── useStudents.js           # Student data hooks
│   ├── useSupervisors.js        # Supervisor data hooks
│   ├── useProjects.js           # Project data hooks
│   ├── useAllocations.js        # Allocation data hooks
│   └── useProgress.js           # Progress data hooks
├── /models
│   ├── User.js                  # User authentication model
│   ├── Student.js               # Student model
│   ├── Supervisor.js            # Supervisor model
│   ├── Project.js               # Project model
│   ├── Allocation.js            # Allocation model
│   └── Progress.js              # Progress model
├── /lib
│   └── dbConnect.js             # MongoDB connection
├── /components
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── ProgressForm.tsx
│   └── Toast.tsx                # Notification system
└── .env.local                   # Environment variables
│── package.json
│── README.md

🗄️ Database Models
User (Authentication)

{
  name: String,
  email: String,
  password: String (hashed),
  role: String, // "admin" | "supervisor" | "student"
  department: String,
  matricNumber: String (for students),
  specialization: String (for supervisors),
  isActive: Boolean
}

Student

{
  name: String,
  matricNumber: String,
  email: String,
  department: String,
  preference: String,
  assignedProject: ObjectId (Project)
}

Supervisor

{
  name: String,
  email: String,
  department: String,
  projectsCount: Number
}

Project

{
  title: String,
  description: String,
  supervisorId: ObjectId (Supervisor),
  status: String // "available" | "assigned" | "completed"
}

Allocation

{
  studentId: ObjectId (Student),
  projectId: ObjectId (Project),
  supervisorId: ObjectId (Supervisor)
}

Progress

{
  studentId: ObjectId (Student),
  projectId: ObjectId (Project),
  report: String,
  submissionDate: Date,
  feedback: String
}

📝 User Flows
Student
* Register via `/register` page (creates user account + student record)
* Login with email/password
* Set project preferences
* View allocated project
* Submit progress reports

Supervisor
* Register via `/register` page (creates user account + supervisor record)
* Login with email/password
* Create projects
* View assigned students
* Give feedback on progress

Admin
* Register via `/register` page (creates first admin account)
* Login with email/password
* Manage students, supervisors, and projects
* Create students via `/admin/students/new`
* Monitor allocations and progress

🔐 Getting Started
1. Set up MongoDB connection in .env.local
2. Run `npm install`
3. Run `npm run dev`
4. Visit `/register` to create user accounts:
   - Create an admin account first
   - Create supervisor accounts
   - Create student accounts (or use admin panel)
5. Login with created accounts and start using the system