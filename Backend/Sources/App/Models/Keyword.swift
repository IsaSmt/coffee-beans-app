import Foundation
import Fluent
import Vapor

final class Keyword: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "keyword"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    // a keyword to describe a coffee (fruchtig, schokoladig, nussig, ...)
    @Field(key: "keyword")
    var keyword: String

    //relationships (Parent Child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one keyword can describe many coffees
    @Parent(key: "coffee_id")
    var coffee: Coffee
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, keyword: String, coffeeID: Coffee.IDValue) {
        self.id = id
        self.keyword = keyword
        self.$coffee.id = coffeeID
    }
}
