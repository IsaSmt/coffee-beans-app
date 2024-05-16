import Foundation
import Fluent

struct CreateCustomerCoffeeListPivot: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("customer_coffee_list")
            .id()
            .field("customer_id", .uuid, .required, .references("customer", "id", onDelete: .cascade))
            .field("coffee_id", .uuid, .required, .references("coffee", "id", onDelete: .cascade))
            .unique(on: "customer_id", "coffee_id") // Enforces that each coffee appears only once per customer's list
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("customer_coffee_list").delete()
    }
}
