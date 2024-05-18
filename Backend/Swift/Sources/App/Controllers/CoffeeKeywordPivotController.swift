import Foundation
import Vapor
import Fluent

// Ensure that CoffeeKeywordPivot conforms to Content to be ResponseEncodable
extension CoffeeKeywordPivot: Content {}

struct CoffeeKeywordPivotController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let coffeeKeywordPivotRoutes = routes.grouped("api", "coffee-keyword-pivot")
        coffeeKeywordPivotRoutes.post(use: createHandler)
        coffeeKeywordPivotRoutes.delete(":pivotID", use: deleteHandler)
        coffeeKeywordPivotRoutes.get("keyword", ":keywordID", "coffees", use: getCoffeesForKeywordHandler)
    }
    
    // POST /api/coffee-keyword-pivot
    func createHandler(_ req: Request) throws -> EventLoopFuture<CoffeeKeywordPivot> {
        let pivot = try req.content.decode(CoffeeKeywordPivot.self)
        return pivot.save(on: req.db).map { pivot }
    }
    
    // DELETE /api/coffee-keyword-pivot/:pivotID
    func deleteHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
        CoffeeKeywordPivot.find(req.parameters.get("pivotID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { pivot in
                pivot.delete(on: req.db)
            }.transform(to: .ok)
    }
    
    // GET /api/coffee-keyword-pivot/keyword/:keywordID/coffees
    func getCoffeesForKeywordHandler(_ req: Request) throws -> EventLoopFuture<[Coffee]> {
        guard let keywordID = req.parameters.get("keywordID", as: UUID.self) else {
            throw Abort(.badRequest)
        }
        
        return CoffeeKeywordPivot.query(on: req.db)
            .filter(\.$keyword.$id == keywordID)
            .with(\.$coffee)
            .all()
            .map { pivots in
                pivots.map { pivot in
                    pivot.coffee
                }
            }
    }
}
