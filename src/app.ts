import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organization/routes'

export const app = fastify()

app.register(organizationRoutes)
