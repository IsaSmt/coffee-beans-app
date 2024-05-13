import Foundation
import Fluent
import Vapor

final class Recipe: Model, Content {
    // defines the table name if its not the same as the model name; wohin wird das model gemappt
    static let schema = "Recipe"
    
    // defines fields with porperty wrappers
    
    // ID is the primary key; it can be optionally used when setting up a new instance
    // one of two things may happen: Either Fluent or the database will generate the ID
    @ID(key: .id)
    var id: UUID?
    
    // @ Field = required; also important to include required in the migration file
    // Siebträger, French Press, Vollautomat
    @Field(key: "machine")
    var machine: String
    
    // how much time to finish
    @Field(key: "time")
    var time: String
    
    // how much coffee
    @Field(key: "amount")
    var amount: String
    
    // amount of espresso
    @Field(key: "espressocount")
    var espressocount: String
    
    // weight of the mug after the coffee ran through
    @Field(key: "mugweight")
    var mugweight: String

    //relationships (Parent Child)
    // children relationships dont need to be initalized. fluent seems to handle that
    // one recipe can be used for many different coffees
    @Parent(key: "coffee_id")
    var coffee: Coffee    
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, machine: String, time: String, amount: String, espressocount: String, mugweight: String, coffeeID: Coffee.IDValue) {
        self.id = id
        self.machine = machine
        self.time = time
        self.amount = amount
        self.espressocount = espressocount
        self.mugweight = mugweight
        self.$coffee.id = coffeeID
    }
}
