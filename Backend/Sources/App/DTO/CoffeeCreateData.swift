import Foundation
import Vapor
import Fluent
import Vapor

/// `CoffeeCreateDTO` serves as a Data Transfer Object responsible for encapsulating
/// the data received in a request body when creating a new `Coffee` entry.
/// This DTO structure ensures that the incoming data has the correct form and types,
/// providing a clear and strict interface that the API endpoint expects for the creation process.
///
/// The DTO includes not only the coffee's basic attributes (like name, description, and origin),
/// but also related data such as an array of keywords and an optional image. By using this DTO,
/// the `createHandler` in `CoffeeController` can decode the incoming request in a type-safe manner
/// and handle the creation of the `Coffee` entity along with the associated `Keyword` entities
/// and `Picture` entity (if provided).
///
/// The DTO's usage allows for separation of the API layer from internal model representations,
/// resulting in a more maintainable codebase where changes to the model don't necessarily affect
/// the shape of the API requests and responses. The DTO also provides a convenient point for extending
/// validation rules or for mapping request data to database models.
///
/// Example of how to use in a route handler:
///

/// func createHandler(_ req: Request) throws -> EventLoopFuture<HTTPStatus> {
///     let coffeeData = try req.content.decode(CoffeeCreateDTO.self)
///     // Use `coffeeData` to create and save a new `Coffee` entity and its related `Keywords` and `Picture`.
/// }
///

struct CoffeeCreateDTO: Content {
    let name: String
    let description: String
    let beantype: String
    let origin: String
    let roastdate: Date?
    let processing: String?
    let keywords: [String]
    let image: Data?
    
    struct KeywordCreateDTO: Content {
        let keyword: String
    }
    
    struct ImageCreateDTO: Content {
        let imageData: Data
        let fileName: String
        let contentType: String // You may require this for proper handling of the image data
    }
}
