import Foundation
import Fluent

struct CreatePicture: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("picture")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("url", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("picture").delete()
    }
}
