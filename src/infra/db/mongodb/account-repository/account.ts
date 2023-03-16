import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountID = result.insertedId.toString()
    return MongoHelper.map(Object.assign({}, accountData, { _id: accountID }))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    const accountID = account?._id
    return account && MongoHelper.map(Object.assign({}, account, { _id: accountID }))
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const ID = new ObjectId(id)
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: ID
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
