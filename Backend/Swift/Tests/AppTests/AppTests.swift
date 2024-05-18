@testable import App
// This allows the test target to access internal entities of the `App` module which are not normally
// accessible due to Swift's access control. It's needed for testing your application without exposing the
// internals globally.
import XCTVapor

final class AppTests: XCTestCase {
    // testing helloWorld functionality
    func testHelloWorld() async throws {
        let app = Application(.testing)
        // cleans up app resources used by the application
        defer { app.shutdown() }
        // set up the necessary configurations, routes, and services
        try await configure(app)
        
        // It simulates an HTTP GET request to the "/hello" endpoint on your application. The
        // `afterResponse:` closure is executed after the server has provided a response to the test request.
        try app.test(.GET, "hello", afterResponse: { res in
            // This asserts that the HTTP status code of the response is `200 OK`, indicating that the
            // request was successful.
            XCTAssertEqual(res.status, .ok)
            // This asserts that the body of the response is the string "Hello, world!".
            XCTAssertEqual(res.body.string, "Hello, world!")
        })
    }
}
