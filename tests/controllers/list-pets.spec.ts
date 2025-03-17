import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'

describe('Fetch Pets By Filter (e2e)', () => {
  beforeEach(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to fetch pets by cep and optional filters', async () => {
    const organizationResponse = await request(app.server)
      .post('/organizations')
      .send({
        responsible_name: 'John Doe',
        email: 'johndoe2@example.com',
        adress: 'rua pipoca, 38',
        cep: '85660-000',
        phone_number: '+55 46 999326838',
        password: '123456',
      })

    expect(organizationResponse.statusCode).toBe(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe2@example.com',
      password: '123456',
    })

    const token = authResponse.body.token
    const organizationId = organizationResponse.body.organization?.id

    await request(app.server)
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

    const response = await request(app.server).get('/pets').query({
      cep: '85660-000',
      size: 'large',
      energy_level: 'high',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'dog name',
          size: 'large',
          energy_level: 'high',
        }),
      ])
    )
  })

  it('should not be able to fetch pets without cep', async () => {
    const response = await request(app.server).get('/pets').query({
      size: 'large',
      energy_level: 'high',
    })

    expect(response.statusCode).toBe(400)
  })
})
