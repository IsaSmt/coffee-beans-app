import Vapor
// Logging api to log info-messages, errors and warnings
import Logging

// entrypoint declaration
@main
enum Entrypoint {
    // main function; can work asyncronious; sends a message, when an error occurs
    static func main() async throws {
        // Variable to detect environment (for example dev, prod, ...)
        var env = try Environment.detect()
        // bootstraps logging system with the envoronment varialbe
        try LoggingSystem.bootstrap(from: &env)
        
        // instance with the whole application is created
        let app = Application(env)
        // surrounding scope (in this case, the `main` function) exits, releasing any resources the
        // application has acquired.
        defer { app.shutdown() }
        
        // attempts to asynchronously configure the application by calling the `configure` function and
        // passing in the `app` instance.
        do {
            try await configure(app)
        } catch {
            app.logger.report(error: error)
            throw error
        }
        // after configuration, this line starts the application
        try await app.execute()
    }
}
