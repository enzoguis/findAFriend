import { fetchByCepParamsSchema } from '@/models/fetch-by-cep-params-schema'
import { makeFetchPetByCepUseCase } from '@/use-cases/factories/make-fetch-pet-by-cep-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchByCep(request: FastifyRequest, reply: FastifyReply) {
  const { cep } = fetchByCepParamsSchema.parse(request.params)

  const fetchByCepUseCase = makeFetchPetByCepUseCase()

  const pets = await fetchByCepUseCase.execute({ cep })

  reply.status(201).send({ pets })
}
