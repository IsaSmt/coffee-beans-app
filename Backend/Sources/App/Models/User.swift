import Foundation
import Fluent
import Vapor

final class Product: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "user"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    @Field(key: "username")
    var username: String
    
    @Field(key: "country")
    var country: String
    
    // Other fields and relationships...
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, username: String, country: String) {
        self.id = id
        self.username = username
        self.country = country
    }
}
