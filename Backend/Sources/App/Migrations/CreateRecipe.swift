import Foundation
import Fluent

struct CreateRecipe: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("recipes")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("machine", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .field("time", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .field("amount", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .field("espressocount", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .field("mugweight", .string, .required) // Creates a 'name' column that is a non-nullable String.
            // relations (only parent relations need that line)
            .field("coffee_id", .uuid, .required, .references("coffee","id",onDelete: .cascade))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("recipes").delete()
    }
}
