import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { listPetsController } from '../list-pets-controller'
import { getPetByIdController } from '../get-pet-by-id-controller'
import { registerPetController } from '../register-pet-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/organizations/:organizationId/pets',
    { onRequest: [verifyJwt] },
    registerPetController
  )
  app.get('/pets', listPetsController)
  app.get('/pets/:id', getPetByIdController)
}
