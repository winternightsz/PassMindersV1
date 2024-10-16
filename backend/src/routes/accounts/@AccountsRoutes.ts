import { app } from '../../server'
import { CreateAccount } from './create-account'
import { FindAllAccounts } from './find-all-accounts'
import { FindAllItemConta } from './find-all-itemconta'

export const AccountsRoutes = async() =>{
    app.register(CreateAccount)
    app.register(FindAllAccounts)
    app.register(FindAllItemConta)
}