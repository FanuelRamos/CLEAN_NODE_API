import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Fanuel Ramos',
        email: 'fanuelramos111@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
})
