export class OrganizationAlreadyExistsWithSameEmailError extends Error {
  constructor() {
    super('Email already exists.')
  }
}
