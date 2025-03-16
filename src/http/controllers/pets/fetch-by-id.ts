import { fetchPetByIdParamsSchema } from '@/models/fetch-pet-by-id-params-schema'
import { makeFetchPetsByIdUseCase } from '@/use-cases/factories/make-fetch-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = fetchPetByIdParamsSchema.parse(request.params)

  const fetchByIdUseCase = makeFetchPetsByIdUseCase()

  const pet = await fetchByIdUseCase.execute({
    id,
  })

  reply.status(200).send(pet)
}
