# Full-Stack Skill Learning Academy Marketplace

A production-ready course marketplace platform with secure authentication, role-based access control, and comprehensive course management features.

## 🚀 Features

### User Management
- ✅ User registration (Student/Instructor)
- ✅ Secure login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Profile management
- ✅ Role-based access control (Student, Instructor, Admin)

### Course Management
- ✅ Create, read, update, delete courses
- ✅ Publish/unpublish courses
- ✅ Course categorization and filtering
- ✅ Course reviews and ratings
- ✅ Search functionality
- ✅ Pagination support

### Student Features
- ✅ Browse and search courses
- ✅ Enroll in courses
- ✅ Track learning progress
- ✅ View course details
- ✅ Rate and review courses
- ✅ Get certificates on completion

### Instructor Features
- ✅ Create and manage courses
- ✅ View student enrollments
- ✅ Track course performance
- ✅ Manage course content

### Admin Features
- ✅ Manage all users
- ✅ Manage all courses
- ✅ Monitor enrollments
- ✅ Track payments
- ✅ Dashboard with statistics

### Payment System
- ✅ Simulated payment processing
- ✅ Transaction tracking
- ✅ Enrollment through payments
- ✅ Refund support

## 📁 Project Structure

```
full-stack/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── Payment.js
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth, validation, error handling
│   ├── config/              # Database configuration
│   ├── server.js            # Main server file
│   ├── seed.js              # Database seeding
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── context/         # Auth context
    │   ├── styles/          # CSS styles
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **CORS:** Cross-Origin Resource Sharing

### Frontend
- **Library:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB connection** in `.env`
   ```
   MONGODB_URI=mongodb://localhost:27017/skill-learning-academy
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

6. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

7. **Start the server**
   ```bash
   npm run dev
   ```

Server will be running at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

Frontend will be running at `http://localhost:5173`

## 🔐 Test Credentials

After running the seed script, use these credentials to test:

### Student Account
- **Email:** student@example.com
- **Password:** password123

### Instructor Account
- **Email:** instructor@example.com
- **Password:** password123

### Admin Account
- **Email:** admin@example.com
- **Password:** password123

## 📚 API Documentation

See [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) for complete API reference.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

**Courses**
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Instructor)
- `PUT /api/courses/:id` - Update course (Instructor)
- `DELETE /api/courses/:id` - Delete course (Instructor)

**Enrollments**
- `POST /api/enrollments/:courseId` - Enroll in course
- `GET /api/enrollments` - Get student enrollments
- `PUT /api/enrollments/:courseId/progress` - Update progress

**Payments**
- `POST /api/payments/initiate/:courseId` - Initiate payment
- `POST /api/payments/process/:transactionId` - Process payment
- `GET /api/payments/history` - Payment history

**Admin**
- `GET /api/admin/users` - List all users
- `GET /api/admin/courses` - List all courses
- `GET /api/admin/dashboard/stats` - Dashboard statistics

## 🎓 Pages

### Public Pages
- **Home** (`/`) - Landing page
- **Courses** (`/courses`) - Course listing with filters
- **Course Details** (`/courses/:id`) - Individual course page
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

### Protected Pages (Student)
- **Student Dashboard** (`/student/dashboard`) - My courses and progress

### Protected Pages (Instructor)
- **Instructor Dashboard** (`/instructor/dashboard`) - Course management

### Protected Pages (Admin)
- **Admin Dashboard** (`/admin/dashboard`) - Platform management

### Error Pages
- **404** (`*`) - Page not found

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Secure token storage

## 📦 Build & Deploy

### Backend Build
```bash
cd backend
npm install
```

### Frontend Build
```bash
cd frontend
npm install
npm run build
```

The `dist` folder will contain production-ready files.

## 🐳 Docker Support (Optional)

Create `Dockerfile` for backend and frontend to containerize the application.

## 📝 Key Features Implemented

- [x] User authentication with JWT
- [x] Role-based access control
- [x] Course CRUD operations
- [x] Student enrollment system
- [x] Progress tracking
- [x] Course reviews and ratings
- [x] Payment processing (simulated)
- [x] Admin dashboard with statistics
- [x] Search and filtering
- [x] Pagination
- [x] Certificate generation
- [x] Input validation
- [x] Error handling
- [x] Responsive design
- [x] Database seeding

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] Video hosting integration
- [ ] Real payment gateway integration (Stripe, PayPal)
- [ ] Live chat support
- [ ] Certificate PDF generation
- [ ] Advanced analytics
- [ ] Instructor analytics dashboard
- [ ] Mobile app
- [ ] Social features (messaging)
- [ ] Wishlist functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For support, please open an issue in the repository or contact the maintainers.

## 🎯 Project Status

✅ **Fully Functional** - All core features are implemented and working.

---

**Built with ❤️ for learners worldwide**
