import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../../presentation/controllers/login/signup/signup'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
