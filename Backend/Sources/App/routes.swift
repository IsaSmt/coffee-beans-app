import Vapor

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
