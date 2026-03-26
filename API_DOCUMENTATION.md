# Skill Learning Academy - Backend API Documentation

## Overview
RESTful API for the Full-Stack Skill Learning Academy Marketplace platform built with Node.js, Express, and MongoDB.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## API Endpoints

### Auth Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // or "instructor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "user": { ...user },
    "token": "jwt_token_here"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "I love learning",
  "phone": "1234567890"
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

---

### Course Endpoints

#### Get All Courses
```
GET /courses?category=Web Development&level=Beginner&search=JavaScript&page=1&limit=10
```

**Query Parameters:**
- `category` - Filter by category
- `level` - Filter by level (Beginner, Intermediate, Advanced)
- `search` - Search in title and description
- `page` - Pagination page
- `limit` - Results per page

#### Get Course by ID
```
GET /courses/:courseId
```

#### Create Course (Instructor Only)
```
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Advanced React",
  "description": "Learn advanced React patterns",
  "shortDescription": "Advanced React",
  "category": "Web Development",
  "level": "Advanced",
  "price": 59.99,
  "duration": 30,
  "modules": [...],
  "learningOutcomes": [...]
}
```

#### Update Course (Instructor Only)
```
PUT /courses/:courseId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 49.99,
  "isPublished": true
}
```

#### Delete Course (Instructor Only)
```
DELETE /courses/:courseId
Authorization: Bearer <token>
```

#### Get Instructor's Courses
```
GET /courses/instructor/courses
Authorization: Bearer <token>
```

#### Add Review to Course
```
POST /courses/:courseId/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great course!"
}
```

---

### Enrollment Endpoints

#### Enroll in Course
```
POST /enrollments/:courseId
Authorization: Bearer <token> (Student)
```

#### Get Student Enrollments
```
GET /enrollments
Authorization: Bearer <token> (Student)
```

#### Get Enrollment Details
```
GET /enrollments/:courseId
Authorization: Bearer <token> (Student)
```

#### Update Progress
```
PUT /enrollments/:courseId/progress
Authorization: Bearer <token> (Student)
Content-Type: application/json

{
  "progress": 50,
  "currentModule": 2,
  "timeSpent": 120
}
```

#### Get Course Enrollments (Instructor)
```
GET /enrollments/course/:courseId/students
Authorization: Bearer <token> (Instructor)
```

---

### Payment Endpoints

#### Initiate Payment
```
POST /payments/initiate/:courseId
Authorization: Bearer <token> (Student)
```

#### Process Payment
```
POST /payments/process/:transactionId
Authorization: Bearer <token>
```

#### Verify Payment
```
GET /payments/verify/:transactionId
Authorization: Bearer <token>
```

#### Get Payment History
```
GET /payments/history
Authorization: Bearer <token> (Student)
```

#### Refund Payment
```
POST /payments/refund/:transactionId
Authorization: Bearer <token>
```

---

### Admin Endpoints

#### Get All Users
```
GET /admin/users?role=student&page=1&limit=10
Authorization: Bearer <token> (Admin)
```

#### Get User by ID
```
GET /admin/users/:userId
Authorization: Bearer <token> (Admin)
```

#### Deactivate User
```
PUT /admin/users/:userId/deactivate
Authorization: Bearer <token> (Admin)
```

#### Activate User
```
PUT /admin/users/:userId/activate
Authorization: Bearer <token> (Admin)
```

#### Delete User
```
DELETE /admin/users/:userId
Authorization: Bearer <token> (Admin)
```

#### Get All Courses (Admin)
```
GET /admin/courses?page=1&limit=10
Authorization: Bearer <token> (Admin)
```

#### Approve/Publish Course
```
PUT /admin/courses/:courseId/approve
Authorization: Bearer <token> (Admin)
```

#### Get All Payments
```
GET /admin/payments?status=successful&page=1&limit=10
Authorization: Bearer <token> (Admin)
```

#### Dashboard Statistics
```
GET /admin/dashboard/stats
Authorization: Bearer <token> (Admin)
```

---

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Data Models

### User
```
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (student, instructor, admin),
  bio: String,
  phone: String,
  profilePicture: String,
  expertise: [String],
  yearsOfExperience: Number,
  enrolledCourses: [ObjectId],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Course
```
{
  title: String,
  description: String,
  category: String,
  level: String,
  price: Number,
  instructor: ObjectId,
  students: [ObjectId],
  modules: [Object],
  duration: Number,
  isPublished: Boolean,
  rating: Number,
  reviews: [Object],
  learningOutcomes: [String],
  createdAt: Date
}
```

### Enrollment
```
{
  student: ObjectId,
  course: ObjectId,
  progress: Number,
  status: String (active, completed, dropped),
  enrolledAt: Date,
  completedAt: Date,
  certificateIssued: Boolean
}
```

### Payment
```
{
  transactionId: String,
  student: ObjectId,
  course: ObjectId,
  amount: Number,
  status: String (pending, successful, failed, refunded),
  paymentMethod: String,
  processedAt: Date
}
```

---

## Setup Instructions

1. **Clone or setup project**
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

4. **Configure environment variables**
   - Set `MONGODB_URI`
   - Set `JWT_SECRET`
   - Set `PORT`
   - Set `FRONTEND_URL`

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Run seed script (optional)**
   ```bash
   npm run seed
   ```

7. **Start server**
   ```bash
   npm run dev
   ```

Server will be running at `http://localhost:5000`
