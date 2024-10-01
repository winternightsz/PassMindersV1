import { app } from '..//../server'
import { CreateUser } from './create-user'

export const UsersRoutes = async () =>{
    app.register(CreateUser)
}