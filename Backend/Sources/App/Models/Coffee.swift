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
    // Date format would be usually yyyy-mm-dd
    @OptionalField(key: "roastdate")
    var roastdate: Date?
    
    // Honey, Washed, Natural ....
    @OptionalField(key: "processing")
    var processing: String?
    
    //relationships (Parent Child)
    // Parents can be optional
    // One coffee is roasted by one roastery
    @Parent(key: "roastery_id")
        var roastery: Roastery
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one coffee can have many reviews
    // This property is an array of child `Review` entities, which represents the one-to-many relationship.
    @Children(for: \.$coffee)
       var reviews: [Review]
    
    // many pictures can show a coffee
    @Children(for: \.$coffee)
    var picture: [Picture]
    
    // many customers may wish one certain coffee
    // This array is 'optional' in the sense that it can contain zero or many Recipe objects.
    // You do not need to do anything extra to make a siblings relationship 'optional'.
    @Siblings(through: CustomerCoffeeListPivot.self, from: \.$coffee, to: \.$customer)
    var customers: [Customer]
    
    // many receipts can use one bean
    @Siblings(through: CoffeeRecipePivot.self, from: \.$coffee, to: \.$recipe)
    var recipes: [Recipe]
    
    // many keywords can describe one coffee
    @Siblings(through: CoffeeKeywordPivot.self, from: \.$coffee, to: \.$keyword)
        var keywords: [Keyword]
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, name: String, description: String, beantype: String, origin: String, roastdate: Date? = nil, processing: String? = nil, roasteryID: Roastery.IDValue) {
        self.id = id
        self.name = name
        self.description = description
        self.beantype = beantype
        self.origin = origin
        self.roastdate = roastdate
        self.processing = processing
        // only parent relations need the following line
        self.$roastery.id = roasteryID // Set the parent roastery ID
    }
}
