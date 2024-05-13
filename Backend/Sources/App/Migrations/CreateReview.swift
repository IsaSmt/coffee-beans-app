import Foundation
import Fluent

struct CreateReview: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("review")
            .id()
            .field("star_rating", .int, .required)
            .field("reason", .string) // By omitting '.required', it makes the column optional.
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("review").delete()
    }
}
