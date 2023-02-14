import { type Request, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
