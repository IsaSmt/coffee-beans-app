import Foundation
import Fluent

struct CreateRoastery: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("roastery")
            .id()
            .field("name", .string, .required)
            .field("description", .string, .required)
            .field("email", .string) // By omitting '.required', it makes the column optional.
            .field("phone", .string) // By omitting '.required', it makes the column optional.
            .field("street", .string) // By omitting '.required', it makes the column optional.
            .field("coffee_id", .uuid, .required, .references("coffee","id",onDelete: .cascade))
            .field("review_id", .uuid, .required, .references("review","id",onDelete: .cascade))
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("roastery").delete()
    }
}
