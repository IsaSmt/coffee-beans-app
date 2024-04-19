import Foundation
import Fluent

struct CreatePostcode: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("postcode")
            .id()
            .field("postcode", .string, .required)
            .field("place", .string, .required)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("postcode").delete()
    }
}
