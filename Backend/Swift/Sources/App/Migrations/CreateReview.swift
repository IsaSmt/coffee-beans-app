import Foundation
import Fluent

struct CreateReview: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("reviews")
            .id()
            .field("star_rating", .double, .required)
            .field("reason", .string) // By omitting '.required', it makes the column optional.
            // relations; only parents need the following line
            .field("customer_id", .uuid, .required, .references("customers", "id", onDelete: .cascade))
            .field("coffee_id", .uuid, .references("coffees", "id", onDelete: .setNull)) // Optional foreign key.
            .field("roastery_id", .uuid, .required, .references("roasteries", "id"))
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("reviews").delete()
    }
}
