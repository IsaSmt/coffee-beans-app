import Foundation
import Fluent
import Vapor

final class Roastery: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "roastery"
    
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
    
    @OptionalField(key: "email")
    var email: String?
    
    @OptionalField(key: "phone")
    var phone: String?
    
    // street and number in this field
    @OptionalField(key: "street")
    var street: String?
    
    // relationships (parent child)
    @Parent(key: "coffee_id")
    var coffee: Coffee
    
    @Parent(key: "review_id")
    var review: Review

    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, name: String, description: String, email: String? = nil, phone: String? = nil, street: String? = nil, coffeeID: Coffee.IDValue, reviewID: Review.IDValue) {
        self.id = id
        self.name = name
        self.description = description
        self.email = email
        self.phone = phone
        self.street = street
        // only parent relations need the following line
        self.$coffee.id = coffeeID
        self.$review.id = reviewID
    }
}
