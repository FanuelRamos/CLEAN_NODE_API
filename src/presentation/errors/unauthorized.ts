export class UnauthorizedError extends Error {
  constructor (stack?: string | undefined) {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}
