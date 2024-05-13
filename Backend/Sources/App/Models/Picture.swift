import Foundation
import Fluent
import Vapor

final class Picture: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "picture"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    // the url pointing to a certain picture where it can be found inside the hard drive
    @Field(key: "url")
    var url: String

    //relationships (Parent Child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one picture can belong to one coffee
    @Parent(key: "coffee_id")
    var coffee: Coffee    
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, url: String, coffeeID: Coffee.IDValue) {
        self.id = id
        self.url = url
        self.$coffee.id = coffeeID
    }
}
