import { Collection, MongoClient } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

describe('SurveyMongoRepository unit test', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should able to add a survey', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }
      ],
      date: new Date()
    })
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })

  test('Should load all surveys on success', async () => {
    await surveyCollection.insertMany([
      {
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      },
      {
        question: 'other_question',
        answers: [
          {
            image: 'other_image',
            answer: 'other_answer'
          }
        ],
        date: new Date()
      }
    ])
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(2)
    expect(surveys[0].question).toBe('any_question')
    expect(surveys[1].question).toBe('other_question')
  })

  test('Should load empty list', async () => {
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(0)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
})
