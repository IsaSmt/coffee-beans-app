import Foundation
import Fluent

struct CreatePostcode: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("postcodes")
            .id()
            .field("postcode", .string, .required)
            .field("place", .string, .required)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("postcodes").delete()
    }
}
