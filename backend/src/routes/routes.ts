import { app } from '..//server'
import { FoldersRoutes } from './folders/@FoldersRoutes'
import { UsersRoutes } from './users/@UsersRoutes'

export const routes = async () => {
    app.register(UsersRoutes)
    app.register(FoldersRoutes)
}