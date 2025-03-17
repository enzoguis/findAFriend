import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
describe('Fetch By Id (e2e)', () => {
  beforeEach(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to fetch a pet by id', async () => {
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
    const organizationId = organization.body.id

    const pet = await request(app.server)
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

    const petId = pet.body.id

    const response = await request(app.server).get(`/pets/${petId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({ name: 'dog name' }))
  })
})
