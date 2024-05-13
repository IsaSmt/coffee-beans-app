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
    
    // small description about the coffee
    @Field(key: "description")
    var description: String
    
    // Arabica, Robusta, ...
    @Field(key: "beantype")
    var beantype: String
    
    // Wo kommen die Bohnen her ?
    @Field(key: "origin")
    var origin: String
    
    // when got the coffee roasted
    @OptionalField(key: "roastdate")
    var roastdate: String?
    
    // Honey, Washed, Natural ....
    @OptionalField(key: "processing")
    var processing: String?
    
    //relationships (Parent Child)
    // children relationships dont need to be initalized. fluent seems to handle that
    // one coffee can have many reviews
    @Parent(key: "review_id")
    var review: Review
    
    // many keywords can describe one coffee
    @Children(for: \.$coffee)
    var keyword: [Keyword]
    
    // many pictures can show a coffee
    @Children(for: \.$coffee)
    var picture: [Picture]
    
    // many receipts can use one bean
    @Children(for: \.$coffee)
    var recipe: [Recipe]
    
    // one roastery may have many different coffees
    @Children(for: \.$coffee)
    var roasterie: [Roastery]
    
    // many customers may wish one certain coffee
    @Children(for: \.$coffee)
    var customer: [Customer]
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, name: String, description: String, beantype: String, origin: String, roastdate: String? = nil, processing: String? = nil, reviewID: Review.IDValue) {
        self.id = id
        self.name = name
        self.description = description
        self.beantype = beantype
        self.origin = origin
        self.roastdate = roastdate
        self.processing = processing
        // only parent relations need the following line
        self.$review.id = reviewID
    }
}
