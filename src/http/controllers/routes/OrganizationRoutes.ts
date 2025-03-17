import { FastifyInstance } from 'fastify'
import { authenticateOrganizationController } from '../authenticate-organization-controller'
import { createOrganizationController } from '../create-organization-controller'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateOrganizationController)
  app.post('/organizations', createOrganizationController)
}
