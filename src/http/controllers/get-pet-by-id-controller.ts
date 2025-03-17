import { getPetByIdParamsSchema } from '@/models/get-pet-by-id-params-schema'
import { makeGetPetsByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getPetByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getPetByIdParamsSchema.parse(request.params)

  const fetchByIdUseCase = makeGetPetsByIdUseCase()

  const response = await fetchByIdUseCase.execute({
    id,
  })

  reply.status(200).send(response.pet)
}
