import { app } from '../../server'
import { CreateUser } from './create-user'
import { FindAllUsers } from './find-all-users'
import { DeleteUser } from './delete-user'

export const UsersRoutes = async () =>{
    app.register(FindAllUsers)
    app.register(CreateUser)
    app.register(DeleteUser)
}