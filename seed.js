// Seed Database with Sample Data
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    console.log('✓ Database cleared');

    // Create sample users
    const users = await User.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'student@example.com',
        password: 'password123',
        role: 'student',
        bio: 'Passionate learner interested in web development',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Experienced full-stack developer and instructor',
        expertise: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        yearsOfExperience: 8,
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        bio: 'Platform administrator',
      },
    ]);

    console.log('✓ Users created');

    // Create sample courses
    const courses = await Course.create([
      {
        title: 'Complete JavaScript Masterclass',
        description: 'Learn JavaScript from beginner to advanced level. This comprehensive course covers all modern JavaScript concepts including ES6+, async/await, promises, and more.',
        shortDescription: 'Master JavaScript from basics to advanced',
        category: 'Web Development',
        level: 'Beginner',
        price: 49.99,
        instructor: users[1]._id,
        duration: 25,
        isPublished: true,
        learningOutcomes: [
          'Understand JavaScript fundamentals and syntax',
          'Master ES6+ features and modern JavaScript',
          'Work with asynchronous JavaScript',
          'Build projects using JavaScript',
        ],
        modules: [
          {
            title: 'JavaScript Basics',
            description: 'Learn variables, data types, operators',
            duration: 3,
          },
          {
            title: 'Functions and Scope',
            description: 'Understanding functions and scope in JavaScript',
            duration: 4,
          },
          {
            title: 'ES6+ Features',
            description: 'Learn modern JavaScript features',
            duration: 5,
          },
          {
            title: 'Async Programming',
            description: 'Callbacks, promises, and async/await',
            duration: 6,
          },
        ],
      },
      {
        title: 'React.js Advanced Course',
        description: 'Master React.js including hooks, context API, and advanced patterns. Build production-ready applications with React.',
        shortDescription: 'Advanced React development and best practices',
        category: 'Web Development',
        level: 'Intermediate',
        price: 59.99,
        instructor: users[1]._id,
        duration: 30,
        isPublished: true,
        learningOutcomes: [
          'Master React hooks and functional components',
          'Work with Context API and state management',
          'Build reusable components',
          'Optimize React applications',
        ],
        modules: [
          {
            title: 'React Fundamentals',
            description: 'JSX, components, and props',
            duration: 4,
          },
          {
            title: 'React Hooks',
            description: 'useState, useEffect, custom hooks',
            duration: 6,
          },
          {
            title: 'State Management',
            description: 'Context API and state management patterns',
            duration: 7,
          },
          {
            title: 'Performance Optimization',
            description: 'Memoization, lazy loading, code splitting',
            duration: 5,
          },
        ],
      },
      {
        title: 'Node.js & Express.js Backend Development',
        description: 'Learn to build scalable backend applications with Node.js and Express.js. Includes database integration and API development.',
        shortDescription: 'Backend development with Node.js and Express',
        category: 'Web Development',
        level: 'Intermediate',
        price: 54.99,
        instructor: users[1]._id,
        duration: 28,
        isPublished: true,
        learningOutcomes: [
          'Build RESTful APIs with Express.js',
          'Work with databases and ORMs',
          'Implement authentication and authorization',
          'Deploy Node.js applications',
        ],
        modules: [
          {
            title: 'Node.js Basics',
            description: 'Introduction to Node.js runtime',
            duration: 3,
          },
          {
            title: 'Express.js Framework',
            description: 'Building web servers with Express',
            duration: 5,
          },
          {
            title: 'Database Integration',
            description: 'MongoDB and Mongoose ODM',
            duration: 6,
          },
          {
            title: 'Authentication & Security',
            description: 'JWT, bcrypt, and security best practices',
            duration: 7,
          },
        ],
      },
      {
        title: 'Python for Data Science',
        description: 'Learn Python programming with focus on data science libraries like pandas, NumPy, and matplotlib.',
        shortDescription: 'Python programming for data analysis',
        category: 'Data Science',
        level: 'Beginner',
        price: 44.99,
        instructor: users[1]._id,
        duration: 22,
        isPublished: true,
        learningOutcomes: [
          'Master Python syntax and concepts',
          'Work with pandas and NumPy',
          'Create data visualizations',
          'Perform data analysis',
        ],
        modules: [
          {
            title: 'Python Fundamentals',
            description: 'Variables, data types, control flow',
            duration: 4,
          },
          {
            title: 'Libraries & Packages',
            description: 'NumPy, pandas, matplotlib',
            duration: 6,
          },
          {
            title: 'Data Analysis',
            description: 'Working with datasets and analysis',
            duration: 6,
          },
        ],
      },
      {
        title: 'Web Design Fundamentals',
        description: 'Learn modern web design principles, UI/UX, and design tools. Create beautiful and responsive websites.',
        shortDescription: 'Web design and UI/UX principles',
        category: 'Design',
        level: 'Beginner',
        price: 39.99,
        instructor: users[1]._id,
        duration: 20,
        isPublished: true,
        learningOutcomes: [
          'Understand design principles',
          'Create responsive layouts',
          'Master CSS and styling',
          'Implement UI/UX best practices',
        ],
        modules: [
          {
            title: 'Design Principles',
            description: 'Color, typography, spacing',
            duration: 4,
          },
          {
            title: 'HTML & CSS',
            description: 'Building blocks of web design',
            duration: 6,
          },
          {
            title: 'Responsive Design',
            description: 'Mobile-first and responsive layouts',
            duration: 5,
          },
        ],
      },
    ]);

    console.log('✓ Courses created');

    console.log('\n✓ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Student: student@example.com / password123');
    console.log('Instructor: instructor@example.com / password123');
    console.log('Admin: admin@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
