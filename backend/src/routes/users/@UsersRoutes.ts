import { app } from '../../server'
import { CreateUser } from './create-user'
import { FindAllUsers } from './find-all-users'
import { DeleteUser } from './delete-user'
import { FindUser } from './find-user'
import { LoginUser } from './login-user'
import { TokenConfirmation } from './token-confirmation'

export const UsersRoutes = async () =>{
    app.register(FindAllUsers)
    app.register(CreateUser)
    app.register(DeleteUser)
    app.register(FindUser)
    app.register(LoginUser)
    app.register(TokenConfirmation)
}