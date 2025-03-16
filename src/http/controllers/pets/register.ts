import { registerPetParamsSchema } from '@/models/register-pet-params-schema'
import { registerPetSchema } from '@/models/register-pet-schema'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const {
    about,
    age,
    dependence_level,
    energy_level,
    environment,
    name,
    requirements,
    size,
  } = registerPetSchema.parse(request.body)

  const { organizationId } = registerPetParamsSchema.parse(request.params)

  const registerPetUseCase = makeRegisterPetUseCase()

  const pet = await registerPetUseCase.execute({
    about,
    age,
    dependence_level,
    energy_level,
    environment,
    name,
    requirements,
    size,
    organization_id: organizationId,
  })

  reply.status(201).send(pet)
}
