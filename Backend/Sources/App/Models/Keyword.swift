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
    @Field(key: "keyword")
    var keyword: String

    //relationships (Parent Child)
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
