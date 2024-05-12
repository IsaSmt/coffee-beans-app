import Vapor
import Fluent
import FluentPostgresDriver

// Configures your application
public func configure(_ app: Application) async throws {
    // Uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    // Register routes
    
    // Configure the database (replace placeholders with credentials on startup)
    let hostname = Environment.get("POSTGRES_HOST") ?? "localhost"
    let username = Environment.get("POSTGRES_USER") ?? "postgres"
    let password = Environment.get("POSTGRES_PASSWORD") ?? "password" // Replace with default password if needed
    let databaseName = Environment.get("POSTGRES_DB") ?? "vapor_database" // Default database name can be changed
    let port = Environment.get("POSTGRES_PORT").flatMap(Int.init(_:)) ?? PostgresConfiguration.ianaPortNumber

    // Initialize PostgresConfiguration with the parameters
    let postgresConfig = PostgresConfiguration(
        hostname: hostname,
        port: port,
        username: username,
        password: password,
        database: databaseName
        // If you need TLS:
        // tlsConfiguration: .forClient(certificateVerification: .none) // Don't use .none in production
    )
    
    app.databases.use(.postgres(configuration: postgresConfig), as: .psql)

    // Register migrations
    app.migrations.add(CreateCoffee())
    app.migrations.add(CreateKeyword())
    app.migrations.add(CreatePicture())
    app.migrations.add(CreatePostcode())
    app.migrations.add(CreateReview())
    app.migrations.add(CreateRoastery())
    app.migrations.add(CreateCustomer())
    app.migrations.add(CreateRecipe())
    
    // Try to run the routes (configure routes)
    try routes(app)

    // Perform automatic migrations at application start
    do {
        try await app.autoMigrate().wait()
    } catch {
        app.logger.error("Failed to migrate the database: \(error)")
    }
}

