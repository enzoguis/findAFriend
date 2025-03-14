import { fetchPetsByFilterParamsSchema } from '@/models/fetch-pets-by-filter-schema'
import { makeFetchPetsByFilterUseCase } from '@/use-cases/factories/make-fetch-pets-by-filter-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchByFilter(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { cep, age, dependence_level, energy_level, environment, size } =
    fetchPetsByFilterParamsSchema.parse(request.query)

  const fetchByFilterUseCase = makeFetchPetsByFilterUseCase()

  const pets = await fetchByFilterUseCase.execute({
    cep,
    age,
    dependence_level,
    energy_level,
    environment,
    size,
  })

  reply.status(201).send({ pets })
}
