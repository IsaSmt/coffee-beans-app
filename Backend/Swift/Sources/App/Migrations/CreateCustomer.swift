import Foundation
import Fluent

struct CreateCustomer: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("customers")
            .id()
            .field("username", .string, .required)
            .field("country", .string, .required)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("customers").delete()
    }
}
