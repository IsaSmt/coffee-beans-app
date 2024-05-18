import Vapor

//The `routes` function will define all of the route handlers that your application should register. These
// routes are responsible for handling incoming HTTP requests and returning responses to the client

func routes(_ app: Application) throws {
    
    // Instantiate controllers
    let coffeeController = CoffeeController()
    let recipeController = RecipeController()
    let keywordController = KeywordController()
    let coffeeRecipePivotController = CoffeeRecipePivotController()
    let coffeeKeywordPivotController = CoffeeKeywordPivotController()
    // Any other controllers you have would be similarly instantiated and registered below.
    
    // Register the controller routes with the application
    try app.register(collection: coffeeController)
    try app.register(collection: recipeController)
    try app.register(collection: keywordController)
    try app.register(collection: coffeeRecipePivotController)
    try app.register(collection: coffeeKeywordPivotController)
        // Root path handler
    app.get { req async in
        "It works! Welcome to the CoffeeDatabase API!"
    }
    
    // The commented-out path for "hello" can be enabled if needed.
    // app.get("hello") { req async -> String in
    //     "Hello, world!"
    // }
    
    // Add more routes or route collections here, as needed.
    // For example:
    // let userController = UserController()
    // try app.register(collection: userController)
}
