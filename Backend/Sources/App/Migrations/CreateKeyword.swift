import Foundation
import Fluent

struct CreateKeyword: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("keyword")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("keyword", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("keyword").delete()
    }
}
