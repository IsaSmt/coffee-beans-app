import Foundation
import Vapor
import Fluent
// Ensure that CoffeeRecipePivot conforms to Content
extension CoffeeRecipePivot: Content {}

struct CoffeeRecipePivotController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let coffeeRecipePivotRoutes = routes.grouped("api", "coffee-recipe-pivot")
        coffeeRecipePivotRoutes.post(use: createHandler)
        coffeeRecipePivotRoutes.delete(":pivotID", use: deleteHandler)
        coffeeRecipePivotRoutes.get("recipe", ":recipeID", "coffees", use: getCoffeesForRecipeHandler)
    }
    
    // POST /api/coffee-recipe-pivot
    func createHandler(_ req: Request) throws -> EventLoopFuture<CoffeeRecipePivot> {
        let pivot = try req.content.decode(CoffeeRecipePivot.self)
        return pivot.save(on: req.db).map { pivot }
    }
    
    // DELETE /api/coffee-recipe-pivot/:pivotID
    func deleteHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
        CoffeeRecipePivot.find(req.parameters.get("pivotID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { pivot in
                pivot.delete(on: req.db)
            }.transform(to: .ok)
    }
    
    // GET /api/coffee-recipe-pivot/recipe/:recipeID/coffees
    func getCoffeesForRecipeHandler(_ req: Request) throws -> EventLoopFuture<[Coffee]> {
        guard let recipeID = req.parameters.get("recipeID", as: UUID.self) else {
            throw Abort(.badRequest)
        }
        
        return CoffeeRecipePivot.query(on: req.db)
            .filter(\.$recipe.$id == recipeID)
            .with(\.$coffee)
            .all()
            .map { pivots in
                pivots.map { pivot in
                    pivot.coffee
                }
            }
    }
}
