import Vapor
import Fluent
import FluentPostgresDriver

// configures your application
// Public = Configure function accessible from anywhere (typically used on startup
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    // register routes
    
    // Configure the database (example from GPT, replace placeholders with credentials on startup)
    /*let hostname = "my_postgres" // Container name of the PostgreSQL service
    let username = "postgres" // Default PostgreSQL username
    let password = "my_password" // Password you set for PostgreSQL
    let databaseName = "my_database" // The database name
    
    app.databases.use(.postgres(
        hostname: hostname,
        username: username,
        password: password,
        database: databaseName
    ), as: .psql)*/
       
    // try lets the app throw an error if there is one
    // calls function name ROUTE and passes on the instance
    try routes(app)
}
