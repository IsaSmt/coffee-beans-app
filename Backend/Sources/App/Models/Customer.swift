import Foundation
import Fluent
import Vapor

final class Customer: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "customer"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    @Field(key: "username")
    var username: String
    
    // where does a customer come from
    @Field(key: "country")
    var country: String
    
    // relationships (parent child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one customer can leave many reviews
    @Children(for: \.$customer)
        var reviews: [Review]
    
    // one customer can 'bookmark' many different coffees on their reminder list
    // This defines the many-to-many relationship between Coffees and Customer.
    // This array is 'optional' in the sense that it can contain zero or many Recipe objects.
    // You do not need to do anything extra to make a siblings relationship 'optional'.
    @Siblings(through: CustomerCoffeeListPivot.self, from: \.$customer, to: \.$coffee)
    var coffees: [Coffee]
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, username: String, country: String){
        self.id = id
        self.username = username
        self.country = country
    }
}
