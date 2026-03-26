const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'student@example.com',
      password: 'password123'
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
}

testLogin();
