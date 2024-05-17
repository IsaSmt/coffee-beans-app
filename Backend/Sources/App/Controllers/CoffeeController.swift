import Foundation
import Vapor
import Fluent

// Responsible for handling requests related to Coffee resources, including CRUD operations,
// and associating Coffee with Keywords and Pictures upon creation.
struct CoffeeController: RouteCollection {
    
    // Registers routes to their respective handler functions when the server starts.
    func boot(routes: RoutesBuilder) throws {
        let coffeeRoutes = routes.grouped("coffees")
        coffeeRoutes.post(use: createHandler)           // POST /coffees to create a new coffee
        coffeeRoutes.get(use: getAllHandler)            // GET /coffees to retrieve all coffees
        coffeeRoutes.get(":coffeeID", use: getHandler)  // GET /coffees/:coffeeID to retrieve a specific coffee
        coffeeRoutes.get("search", use: searchHandler)  // GET /coffees/search?term=query to search coffees by keyword
        coffeeRoutes.put(":coffeeID", use: updateHandler) // PUT /coffees/:coffeeID to update a specific coffee
        coffeeRoutes.delete(":coffeeID", use: deleteHandler) // DELETE /coffees/:coffeeID to delete a specific coffee
    }
    
    // Create a new Coffee entry with DTO, which includes associated Keywords and Picture.
    func createHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
            let createData = try req.content.decode(CoffeeCreateDTO.self)
            
            return req.db.transaction { db -> EventLoopFuture<HTTPStatus> in
                let coffee = Coffee(name: createData.name,
                                    description: createData.description,
                                    beantype: createData.beantype,
                                    origin: createData.origin,
                                    roastdate: createData.roastdate,
                                    processing: createData.processing)
                
                return coffee.save(on: db).flatMap { _ -> EventLoopFuture<HTTPStatus> in
                    guard let coffeeID = coffee.id else {
                        return db.eventLoop.makeFailedFuture(Abort(.internalServerError, reason: "Coffee ID not available after save."))
                    }
                    let keywordSaveFutures = createData.keywords.compactMap { keywordStr -> EventLoopFuture<Void> in
                        let keyword = Keyword(keyword: keywordStr)
                        return keyword.save(on: db).flatMap { _ -> EventLoopFuture<Void> in
                            let pivot = CoffeeKeywordPivot(coffeeID: coffeeID, keywordID: keyword.id!)
                            return pivot.save(on: db)
                        }
                    }

                    return EventLoopFuture<Void>.andAllSucceed(keywordSaveFutures, on: db.eventLoop).flatMap { _ -> EventLoopFuture<HTTPStatus> in
                        guard let imageData = createData.image else {
                            return db.eventLoop.makeSucceededFuture(.ok) // No image, so return success
                        }
                        // Placeholder for where you would generate the picture URL
                        let pictureURL = "<#GENERATE_PICTURE_URL#>"
                        let picture = Picture(url: pictureURL, coffeeID: coffeeID)
                        return picture.save(on: db).transform(to: .created) // Return .created status after saving image
                    }
                }
            }
        }
    // Retrieve all Coffee entries from the database.
    func getAllHandler(_ req: Request) -> EventLoopFuture<[Coffee]> {
        Coffee.query(on: req.db).with(\.$pictures).with(\.$keywords).all()
    }
    
    // Retrieve a specific Coffee by ID, including associated Keywords and Picture.
    func getHandler(_ req: Request) -> EventLoopFuture<Coffee> {
        Coffee.find(req.parameters.get("coffeeID"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { coffee in
                coffee.$pictures.get(on: req.db).and(coffee.$keywords.get(on: req.db)).transform(to: coffee)
            }
    }
    
    // Update a specific Coffee by ID.
    func updateHandler(_ req: Request) -> EventLoopFuture<HTTPStatus> {
        // Implementation for updating a Coffee...
    }
    
    // Delete a specific Coffee by ID.
    func deleteHandler(_ req: Request) -> EventLoopFuture<HTTPStatus> {
        // Implementation for deleting a Coffee...
    }
    
    // Search for Coffee entries that have an association with a provided keyword.
    func searchHandler(_ req: Request) -> EventLoopFuture<[Coffee]> {
        // Ensure there is a search term.
        guard let searchTerm = req.query[String.self, at: "term"] else {
            return req.eventLoop.future(error: Abort(.badRequest))
        }
        
        // Search for Keywords matching the searchTerm.
        return Keyword.query(on: req.db).filter(\.$keyword == searchTerm).all()
            .flatMap { keywords in
                // Unwrap the keyword UUIDs and filter out any nil values.
                let keywordUUIDs = keywords.compactMap { $0.id }
                
                // Ensure we have at least one UUID, otherwise return an empty array.
                guard !keywordUUIDs.isEmpty else {
                    return req.eventLoop.future([])
                }
                
                // Perform the query to get Coffees associated with these Keyword UUIDs.
                return Coffee.query(on: req.db)
                    .join(CoffeeKeywordPivot.self, on: \Coffee.$id == \CoffeeKeywordPivot.$coffee.$id)
                    .filter(CoffeeKeywordPivot.self, \CoffeeKeywordPivot.$keyword.$id ~~ keywordUUIDs)
                    .all()
            }
    }
}
