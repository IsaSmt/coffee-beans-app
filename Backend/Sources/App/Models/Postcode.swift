import Foundation
import Fluent
import Vapor

final class Postcode: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "postcode"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    // postcode for a certain village/city
    // to include leading 0 as well as alphanummeric characters, postcode will stay as string
    @Field(key: "postcode")
    var postcode: String
    
    // city, village, ...
    @Field(key: "place")
    var place: String
    
    // Other fields and relationships...
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    init(id: UUID? = nil, postcode: String, place: String) {
        self.id = id
        self.postcode = postcode
        self.place = place
    }
}
