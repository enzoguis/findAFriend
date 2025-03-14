import { FastifyInstance } from 'fastify'
import { register } from './register'
import { fetchByFilter } from './fetch-by-filter'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/organizations/:organizationId/pets', register)
  app.get('/pets', fetchByFilter)
}
