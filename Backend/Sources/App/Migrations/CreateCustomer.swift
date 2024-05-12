import Foundation
import Fluent

struct CreateCustomer: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("customer")
            .id()
            .field("username", .string, .required)
            .field("country", .string, .required)
            .field("review_id", .uuid, .required, .references("review","id",onDelete: .cascade))
            .field("coffee_id", .uuid, .required, .references("coffee","id",onDelete: .cascade))
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("customer").delete()
    }
}
