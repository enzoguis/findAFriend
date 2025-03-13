export class OrganizationAlreadyExistsWithSamePhoneError extends Error {
  constructor() {
    super('Phone number already exists.')
  }
}
