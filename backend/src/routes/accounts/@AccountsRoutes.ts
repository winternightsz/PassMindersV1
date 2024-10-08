import { app } from '../../server'
import { CreateAccount } from './create-account'
import { FindAllAccounts } from './find-all-accounts'

export const AccountsRoutes = async() =>{
    app.register(CreateAccount)
    app.register(FindAllAccounts)
}