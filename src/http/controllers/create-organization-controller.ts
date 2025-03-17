import { FastifyReply, FastifyRequest } from 'fastify'
import { createOrganizationSchema } from '@/models/create-organization-schema'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'

export async function createOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { adress, cep, email, password, phone_number, responsible_name } =
    createOrganizationSchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  const organization = await createOrganizationUseCase.execute({
    adress,
    cep,
    email,
    password,
    phone_number,
    responsible_name,
  })

  reply.status(201).send(organization)
}
