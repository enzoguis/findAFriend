import { listPetsParamsSchema } from '@/models/list-pets-schema'
import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { cep, age, dependence_level, energy_level, environment, size } =
    listPetsParamsSchema.parse(request.query)

  const fetchByFilterUseCase = makeListPetsUseCase()

  const pets = await fetchByFilterUseCase.execute({
    cep,
    age,
    dependence_level,
    energy_level,
    environment,
    size,
  })

  reply.status(200).send(pets)
}
