import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { organizationRoutes } from './http/controllers/routes/OrganizationRoutes'
import { petsRoutes } from './http/controllers/routes/petsRoutes'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(organizationRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
