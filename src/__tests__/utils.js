// src/__tests__/utils.js
const request = require('supertest');
const app = require('../server');

const getAuthToken = async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'testuser', // Test üçün istifadəçi adı
      password: 'testpassword' // Test üçün şifrə
    });

  return response.body.token; // Tokeni qaytarır
};

module.exports = { getAuthToken };
