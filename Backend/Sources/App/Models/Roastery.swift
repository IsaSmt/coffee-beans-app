import Foundation
import Fluent
import Vapor

final class Roastery: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "roasteries"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    @Field(key: "name")
    var name: String
    
    // short description of the coffee
    @Field(key: "description")
    var description: String
    
    // way of contacting the roastery
    @OptionalField(key: "email")
    var email: String?
    
    // way of contacting the roastery
    @OptionalField(key: "phone")
    var phone: String?
    
    // street and number in this field
    @OptionalField(key: "street")
    var street: String?
    
    // relationships (parent child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // One roastery has many coffees. Note: This array does not need initialization.
    // One roastery has many Coffees
    @Children(for: \.$roastery)
        var coffees: [Coffee]
    
    // One roastery has many Reviews
    @Children(for: \.$roastery)
        var reviews: [Review]

    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, name: String, description: String, email: String? = nil, phone: String? = nil, street: String? = nil) {
        self.id = id
        self.name = name
        self.description = description
        self.email = email
        self.phone = phone
        self.street = street
    }
}
