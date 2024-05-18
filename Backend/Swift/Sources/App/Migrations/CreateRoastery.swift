import Foundation
import Fluent

struct CreateRoastery: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("roasteries")
            .id()
            .field("name", .string, .required)
            .field("description", .string, .required)
            .field("email", .string) // By omitting '.required', it makes the column optional.
            .field("phone", .string) // By omitting '.required', it makes the column optional.
            .field("street", .string) // By omitting '.required', it makes the column optional.
            // only the parent relations need the following line
            // Foreign key 'postcode_id' referencing the primary key ('id') of 'postcodes' table
            .field("postcode_id", .uuid, .required, .references("postcodes", "id"))
            .unique(on: "email") // Assuming you want the email to be unique if provided
            .unique(on: "phone") 
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        // Delete the table if we need to revert the migration
        database.schema("roasteries").delete()
    }
}
