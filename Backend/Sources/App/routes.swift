import Vapor

//The `routes` function will define all of the route handlers that your application should register. These
// routes are responsible for handling incoming HTTP requests and returning responses to the client

func routes(_ app: Application) throws {
    
    // Create an instance of the CoffeeController
    let coffeeController = CoffeeController()
    
    // Register the CoffeeController routes
    try app.register(collection: coffeeController)
    
    // A simple root handler to confirm the server is running
    // When accessing the root path (localhost:8080), a simple message is returned
    // when opening localhost:8080; define a GET path for root
    app.get { req async in
        // returning the following string
        "It works! Welcome to the CoffeeDatabase API!"
    }
    
    /* just in case
     // when opening localhost:8080/hello; define a GET path for /hello
     app.get("hello") { req async -> String in
         // returning the following string
         "Hello, world!"
     }*/
    
    // You can add any other routes for different controllers or functionalities here
    // For instance, if you had a UserController for handling users, you would set up its routes similarly:
    // let userController = UserController()
    // try app.register(collection: userController)
}
