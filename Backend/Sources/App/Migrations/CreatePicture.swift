import Foundation
import Fluent

struct CreatePicture: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("pictures")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("url", .string, .required) // Creates a 'name' column that is a non-nullable String.
            // relations (only parent relations need that line)
            .field("coffee_id", .uuid, .required, .references("coffees","id",onDelete: .cascade))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("pictures").delete()
    }
}
