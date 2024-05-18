import Foundation
import Fluent
import Vapor

final class Review: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "reviews"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    @Field(key: "star_rating")
    var star_rating: Double
    
    @OptionalField(key: "reason")
    var reason: String?
    
    //relationships (Parent Child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one review points to one coffee
    @OptionalParent(key: "coffee_id")
        var coffee: Coffee?
    
    // One review is associated with one roastery
     @Parent(key: "roastery_id")
     var roastery: Roastery
    
    // one review is written by one customer
    @Parent(key: "customer_id")
    var customer: Customer
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, star_rating: Double, reason: String? = nil, coffeeID: Coffee.IDValue?, customerID: Customer.IDValue, roasteryID: Roastery.IDValue) {
        self.id = id
        self.star_rating = star_rating
        self.reason = reason
        // only parent relations need the following line
        self.$coffee.id = coffeeID
        self.$customer.id = customerID
        self.$roastery.id = roasteryID
    }
}
