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
        database.schema("review").delete()
    }
}
