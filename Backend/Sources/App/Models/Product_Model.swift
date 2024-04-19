import Foundation
import Fluent
import Vapor

final class Product: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "products"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    @Field(key: "name")
    var name: String
    
    @Field(key: "description")
    var description: String
    
    // Rösterei
    @Field(key: "producer")
    var producer: String
    
    // herkunft Bohne
    @Field(key: "origin")
    var origin: String
    
    
    
    // Other fields and relationships...
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, name: String, description: String) {
        self.id = id
        self.name = name
        self.description = description
    }
}
