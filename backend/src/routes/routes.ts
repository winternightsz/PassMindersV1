import { app } from '..//server'
import { UsersRoutes } from './users/@UsersRoutes'

export const routes = async () => {
    app.register(UsersRoutes)
}