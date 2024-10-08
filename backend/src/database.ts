import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
    client: 'mssql',
    connection: {
      database: 'PassMinders',
      server: 'schdev.ddns.net',
      user: 'PassMinders',
      password: '12345',
      port: 53341,
      connectionTimeout: 30000,
      options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true,
      },
    },
})
