import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
describe('Create (e2e)', () => {
  beforeEach(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to create a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      responsible_name: 'John Doe',
      email: 'johndoe2@example.com',
      adress: 'rua pipoca, 38',
      cep: '85660-000',
      phone_number: '+55 46 999326838',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new organization without a WhatsApp number within the expected model', async () => {
    await expect(() =>
      request(app.server).post('/organizations').send({
        responsible_name: 'John Doe',
        email: 'johndoe2@example.com',
        adress: 'rua pipoca, 38',
        cep: '85660-000',
        phone_number: '+55 (46) 999326838',
        password: '123456',
      })
    ).rejects
  })
})
