const app = require('application')
const request = require('supertest')
request(app)
  .post('/api/auth')
  .set('Authorization', 'Basic [YOUR CREDENTIALS HERE]')
  .expect(200)
  .end((err, res) => {
    console.log(res.result)
    // Your assertions here...
  })
