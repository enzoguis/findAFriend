import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
describe('Authenticate (e2e)', () => {
  beforeEach(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to authenticate a organization', async () => {
    await request(app.server).post('/organizations').send({
      responsible_name: 'John Doe',
      email: 'johndoe2@example.com',
      adress: 'rua pipoca, 38',
      cep: '85660-000',
      phone_number: '+55 46 999326838',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe2@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
  })
})
