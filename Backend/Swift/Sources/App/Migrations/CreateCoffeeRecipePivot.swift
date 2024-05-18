import Foundation
import Fluent

struct CreateCoffeeRecipePivot: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("coffee_recipe") // Use the same string value as your pivot's schema
            .id()
            .field("coffee_id", .uuid, .required, .references("coffees", "id", onDelete: .cascade)) // "coffees" should match the schema name of the Coffee model
            .field("recipe_id", .uuid, .required, .references("recipes", "id", onDelete: .cascade)) // "recipes" should match the schema name of the Recipe model
            .unique(on: "coffee_id", "recipe_id") // Optional: add a unique constraint to prevent duplicate pairs
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("coffee_recipe").delete()
    }
}
