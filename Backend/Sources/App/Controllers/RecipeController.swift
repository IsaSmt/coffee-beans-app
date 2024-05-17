import Foundation
import Vapor
import Fluent

// Define the RecipeController to contain all CRUD operations for Recipe resources.
struct RecipeController: RouteCollection {
    
    func boot(routes: RoutesBuilder) throws {
        let recipeRoutes = routes.grouped("recipes")
        recipeRoutes.post(use: createHandler)             // POST /recipes
        recipeRoutes.delete(":recipeID", use: deleteHandler) // DELETE /recipes/:recipeID
        recipeRoutes.get(use: getAllHandler)              // GET /recipes
        recipeRoutes.get("search", use: searchHandler)    // GET /recipes/search?term=query
    }
    
    func createHandler(_ req: Request) throws -> EventLoopFuture<Recipe> {
        let recipe = try req.content.decode(Recipe.self)
        return recipe.save(on: req.db).map { recipe }
    }
    
    func deleteHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
        return Recipe.find(req.parameters.get("recipeID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .noContent)
    }
    
    func getAllHandler(_ req: Request) throws -> EventLoopFuture<[Recipe]> {
        return Recipe.query(on: req.db).all()
    }
    
    // Example search handler for finding recipes based on the machine field.
    // You may adjust the search criteria based on your needs.
    func searchHandler(_ req: Request) throws -> EventLoopFuture<[Recipe]> {
        guard let searchTerm = req.query[String.self, at: "term"] else {
            throw Abort(.badRequest)
        }
        // Depending on your search requirements, this query may vary.
        // For example, you might want to search by machine or filter by other fields.
        // Below is just a simple search by the 'machine' field.
        return Recipe.query(on: req.db).filter(\.$machine ~~ searchTerm).all()
    }
}

// Remember to also define the route handlers for any relationships or additional operations that the Recipe might have or need.
// The searchHandler is basic and would need to be customized based on how you want users to be able to search for recipes.

// In your route setup (e.g., in configure.swift), you'll need to register the RecipeController:
// let recipeController = RecipeController()
// app.register(collection: recipeController)
