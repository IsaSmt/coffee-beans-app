import Foundation
import Fluent

struct CreateCoffeeKeywordPivot: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(CoffeeKeywordPivot.schema)
            .id()
            .field("coffee_id", .uuid, .required, .references(Coffee.schema, "id", onDelete: .cascade)) // "coffees" should match the schema name of the Coffee model
            .field("keyword_id", .uuid, .required, .references(Keyword.schema, "id", onDelete: .cascade)) // "keywords" should match the schema name of the Keyword model
            .unique(on: "coffee_id", "keyword_id") // Optional: add a unique constraint to prevent duplicate pairs
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema(CoffeeKeywordPivot.schema).delete()
    }
}
