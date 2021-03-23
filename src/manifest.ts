const manifest = {
    database: {
        databaseName: process.env.DATABASE_NAME,
        password: process.env.PASSWORD
    },
    server: {
        port: process.env.PORT || 3333
    }
}


export default manifest;