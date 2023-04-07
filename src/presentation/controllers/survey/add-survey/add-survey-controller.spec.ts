/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Validation } from '../../../protocols/validation'
import { AddSurveyController } from './add-survey-controller'
import { HttpRequest } from './add-survey-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any) {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})
