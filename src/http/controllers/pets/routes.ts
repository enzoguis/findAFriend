import { FastifyInstance } from 'fastify'
import { register } from './register'
import { fetchByCep } from './fetch-by-cep'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/organizations/:organizationId/pets', register)
  app.get('/pets/:cep', fetchByCep)
}
