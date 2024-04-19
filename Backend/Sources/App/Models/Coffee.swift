import Foundation
import Fluent
import Vapor

final class Coffee: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "coffee"
    
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
    
    // Arabica, Robusta, ...
    @Field(key: "beantype")
    var beantype: String
    
    // Wo kommen die Bohnen her ?
    @Field(key: "origin")
    var origin: String
    
    // Honey, Washed, Natural ....
    @OptionalField(key: "processing")
    var processing: String?
    
    //relationships (Parent Child)
    // one coffee can have many reviews
    @Parent(key: "review_id")
    var review: Review
    
    @Children(for: \.$coffee)
    var keywords: [Keyword]
    
    @Children(for: \.$coffee)
    var pictures: [Picture]
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, name: String, description: String, beantype: String, origin: String, processing: String? = nil, reviewID: Review.IDValue) {
        self.id = id
        self.name = name
        self.description = description
        self.beantype = beantype
        self.origin = origin
        self.processing = processing
        // only parent relations need the following line
        self.$review.id = reviewID
    }
}
