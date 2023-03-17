import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
})
