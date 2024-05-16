import Foundation
import Fluent

struct CreateKeyword: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("keywords")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("keyword", .string, .required) // Creates a 'name' column that is a non-nullable String.
            // realtions (ony prents relations need that line
            .field("coffee_id", .uuid, .required, .references("coffee","id",onDelete: .cascade))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("keywords").delete()
    }
}
