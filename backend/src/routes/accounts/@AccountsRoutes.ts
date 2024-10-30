import { app } from '../../server'
import { CreateAccount } from './create-account'
import { DeleteAccount } from './delete-account'
import { EditAccount } from './edit-account'
import { FindAccount } from './find-account'
import { FindAllAccounts } from './find-all-accounts'
import { FindAllItemConta } from './find-all-itemconta'
import { UpdateAccount } from './update-account'

export const AccountsRoutes = async() =>{
    app.register(CreateAccount)
    app.register(FindAccount)
    app.register(FindAllAccounts)
    app.register(FindAllItemConta)
    app.register(DeleteAccount)
    app.register(EditAccount)
    app.register(UpdateAccount)
}