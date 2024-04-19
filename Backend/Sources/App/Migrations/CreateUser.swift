import Foundation
import Fluent

struct CreateUser: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("user")
            .id()
            .field("username", .string, .required)
            .field("country", .string, .required)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("user").delete()
    }
}
