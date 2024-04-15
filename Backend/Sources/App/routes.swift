import Vapor

//The `routes` function will define all of the route handlers that your application should register. These
// routes are responsible for handling incoming HTTP requests and returning responses to the client

func routes(_ app: Application) throws {
    
    // when opening localhost:8080; define a GET path for root
    app.get { req async in
        // returning the following string
        "It works! A hellow world to you guys!"
    }

    // when opening localhost:8080/hello; define a GET path for /hello
    app.get("hello") { req async -> String in
        // returning the following string
        "Hello, world!"
    }
}
