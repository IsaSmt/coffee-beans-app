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
    // children relationships dont need to be initalized. fluent seems to handle that
    // one customer can leave many reviews
    @Parent(key: "review_id")
    var review: Review
    
    // one customer can safe many different coffees
    @Parent(key: "coffee_id")
    var coffee: Coffee
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, username: String, country: String, coffeeID: Coffee.IDValue, reviewID: Review.IDValue){
        self.id = id
        self.username = username
        self.country = country
        self.$coffee.id = coffeeID
        self.$review.id = reviewID
    }
}
