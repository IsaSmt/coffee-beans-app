import Foundation
import Vapor
import Fluent

// Define the KeywordController to contain all CRUD operations for Keyword resources.
struct KeywordController: RouteCollection {
    
    func boot(routes: RoutesBuilder) throws {
        let keywordRoutes = routes.grouped("keywords")
        keywordRoutes.post(use: createHandler)            // POST /keywords
        keywordRoutes.delete(":keywordID", use: deleteHandler) // DELETE /keywords/:keywordID
        keywordRoutes.get(use: getAllHandler)             // GET /keywords
        keywordRoutes.get("search", use: searchHandler)   // GET /keywords/search?term=query
    }
    
    func createHandler(_ req: Request) throws -> EventLoopFuture<Keyword> {
        let keyword = try req.content.decode(Keyword.self)
        return keyword.save(on: req.db).map { keyword }
    }
    
    func deleteHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
        return Keyword.find(req.parameters.get("keywordID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .noContent)
    }
    
    func getAllHandler(_ req: Request) throws -> EventLoopFuture<[Keyword]> {
        return Keyword.query(on: req.db).all()
    }
    
    func searchHandler(_ req: Request) throws -> EventLoopFuture<[Keyword]> {
        guard let searchTerm = req.query[String.self, at: "term"] else {
            throw Abort(.badRequest)
        }
        return Keyword.query(on: req.db).filter(\.$keyword ~~ searchTerm).all()
    }
}
