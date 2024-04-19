import Foundation
import Fluent

struct CreateCoffee: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        // Create a new table for 'Coffee'
        database.schema("coffee")
            .id() // Creates an 'id' column that is a UUID and the primary key.
            .field("name", .string, .required) // Creates a 'name' column that is a non-nullable String.
            .field("description", .string, .required) // Creates a 'description' column that is a non-nullable String.
            .field("beantype", .string, .required) // Creates a 'beantype' column that is a non-nullable String.
            .field("origin", .string, .required) // Creates an 'origin' column that is a non-nullable String.
            // Creates an 'processing' column that is a nullable String (optional).
            .field("processing", .string) // By omitting '.required', it makes the column optional.
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("coffee").delete()
    }
}
