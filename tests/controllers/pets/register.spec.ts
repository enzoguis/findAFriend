import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
describe('Register (e2e)', () => {
  beforeEach(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to register a new pet', async () => {
    const organization = await request(app.server).post('/organizations').send({
      responsible_name: 'John Doe',
      email: 'johndoe2@example.com',
      adress: 'rua pipoca, 38',
      cep: '85660-000',
      phone_number: '+55 46 999326838',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe2@example.com',
      password: '123456',
    })

    const token = await authResponse.body.token
    const organizationId = organization.body.organization.id

    const response = await request(app.server)
      .post(`/organizations/${organizationId}/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'dog name',
        about: 'about kk',
        age: 'puppy',
        size: 'large',
        energy_level: 'high',
        dependence_level: 'high',
        environment: 'indoor',
        requirements: 'nothing',
      })

    expect(response.statusCode).toEqual(201)
  })
})
