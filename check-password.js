const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const connectDB = require('./config/database');

const checkPassword = async () => {
  try {
    await connectDB();
    const user = await User.findOne({ email: 'student@example.com' }).select('+password');
    console.log('User found:', !!user);
    if (user) {
      console.log('Password hash in DB:', user.password);
      const isMatch = await user.comparePassword('password123');
      console.log('comparePassword("password123") returns:', isMatch);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

checkPassword();
