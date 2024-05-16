import Foundation
import Vapor
import Fluent

// Define the CoffeeController to contain all CRUD operations for Coffee resources.
struct CoffeeController: RouteCollection {
    
    // Boot function gets called when the server starts to register routes to handlers.
    func boot(routes: RoutesBuilder) throws {
        let coffeeRoutes = routes.grouped("coffees")
        coffeeRoutes.post(use: createHandler)           // POST /coffees
        coffeeRoutes.delete(":coffeeID", use: deleteHandler) // DELETE /coffees/:coffeeID
        coffeeRoutes.get(use: getAllHandler)            // GET /coffees
        coffeeRoutes.get("search", use: searchHandler)  // GET /coffees/search?term=query
    }
    
    // Handler to create a new Coffee entry.
    func createHandler(_ req: Request) throws -> EventLoopFuture<Coffee> {
        // Decode the request's JSON body to a Coffee model.
        let coffee = try req.content.decode(Coffee.self)
        // Save the new coffee to the database and return the result.
        return coffee.save(on: req.db).map { coffee }
    }
    
    // Handler to delete a Coffee entry.
    func deleteHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
        // Get the coffee ID from the request's parameters, find the Coffee in the DB,
        // unwrap it (or throw a 404 error if not found), then delete the found Coffee.
        return Coffee.find(req.parameters.get("coffeeID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .noContent) // Respond with a 204 No Content status.
    }
    
    // Handler to retrieve all Coffee entries.
    func getAllHandler(_ req: Request) throws -> EventLoopFuture<[Coffee]> {
        // Query all coffees from the database and return them.
        return Coffee.query(on: req.db).all()
    }
    
    // Handler to search for Coffee entries by a search term.
    func searchHandler(_ req: Request) throws -> EventLoopFuture<[Coffee]> {
        // Try to retrieve the search term from the query string, if it doesn't exist, throw a bad request error.
        guard let searchTerm = req.query[String.self, at: "term"] else {
            throw Abort(.badRequest)
        }
        // Query the database for coffees where the name or description matches the search term, using a case-insensitive 'like' operator.
        return Coffee.query(on: req.db)
                     .group(.or) { or in
                         or.filter(\.$name ~~ searchTerm) // "~~" is the 'like' operator in Fluent
                         or.filter(\.$description ~~ searchTerm)
                     }.all() // Return all results that match the search query.
    }
}
