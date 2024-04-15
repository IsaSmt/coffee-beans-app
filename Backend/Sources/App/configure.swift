import Vapor

// configures your application
// Public = Configure function accessible from anywhere (typically used on startup
// 
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    // register routes
    
    // try lets the app throw an error if there is one
    // calls function name ROUTE and passes on the instance
    try routes(app)
}
