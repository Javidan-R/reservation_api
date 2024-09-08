const request = require('supertest');
const { app, server } = require('../server');
const { Venue } = require('../models/Venue'); // Venue modelini uyğun şəkildə daxil edin
const { getAuthToken } = require('./utils'); // Düzgün yolu göstərdiyinizə əmin olun
describe('Venue API', () => {
    let token;

    beforeAll(async () => {
      token = await getAuthToken(); // Tokeni əldə edin
    });
  
    beforeEach(async () => {
      await Venue.destroy({ where: {} }); // Testlərdən əvvəl baza vəziyyətini sıfırlayın
    });
    afterAll(async () => {
        if (server) {
          server.close(); // Serveri bağlayın
        }
      });

  it('Yeni məkan yaratmalıdır', async () => {
    const response = await request(app)
      .post('/api/venues')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Yeni Məkan',
        location: 'Bakı',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Yeni Məkan');
  });

  it('Mövcud məkanları əldə etməlidir', async () => {
    // Test üçün məkan yaradın
    await Venue.create({ name: 'Məkan 1', location: 'Bakı' });

    const response = await request(app)
      .get('/api/venues?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`); // Tokeni əlavə edin

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('venues');
    expect(response.body.venues).toBeInstanceOf(Array);
  });

  it('Məkan ID-ə əsasən məlumatları əldə etməlidir', async () => {
    // Test üçün məkan yaradın
    const venue = await Venue.create({ name: 'Məkan 2', location: 'Bakı' });

    const response = await request(app)
      .get(`/api/venues/${venue.id}`)
      .set('Authorization', `Bearer ${token}`); // Tokeni əlavə edin

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', venue.id);
  });

  it('Mövcud məkanı yeniləməlidir', async () => {
    // Test üçün məkan yaradın
    const venue = await Venue.create({ name: 'Məkan 3', location: 'Bakı' });

    const response = await request(app)
      .put(`/api/venues/${venue.id}`)
      .set('Authorization', `Bearer ${token}`) // Tokeni əlavə edin
      .send({
        name: 'Yenilənmiş Məkan',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Yenilənmiş Məkan');
  });

  it('Mövcud məkanı silməlidir', async () => {
    // Test üçün məkan yaradın
    const venue = await Venue.create({ name: 'Məkan 4', location: 'Bakı' });

    const response = await request(app)
      .delete(`/api/venues/${venue.id}`)
      .set('Authorization', `Bearer ${token}`); // Tokeni əlavə edin

    expect(response.statusCode).toBe(204); // Silindiyi təqdirdə status kodu 204 olmalıdır
  });
});
