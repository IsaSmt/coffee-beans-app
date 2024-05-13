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
    // please add "sec." in the frontend
    @Field(key: "time")
    var time: Int
    
    // how much coffee
    // please add "g" in the frontend
    @Field(key: "amount")
    var amount: Double
    
    // amount of espresso
    @Field(key: "espressocount")
    var espressocount: Int
    
    // weight of the mug after the coffee ran through
    // please add "g" in the frontend
    @Field(key: "mugweight")
    var mugweight: Double

    //relationships (Parent Child)
    // Parents can be optional
    // children dont need to be optional since the array is empty, if there are no associated children
    // children relationships dont need to be initalized. fluent seems to handle that
    // one recipe can be used for many different coffees
    @Parent(key: "coffee_id")
    var coffee: Coffee    
    
    // empty initalizer to fulfill the requreement of model
    init() { }
    
    // Custom initalizer if needed
    // if no processing is given, the database will insert NULL
    init(id: UUID? = nil, machine: String, time: Int, amount: Double, espressocount: Int, mugweight: Double, coffeeID: Coffee.IDValue) {
        self.id = id
        self.machine = machine
        self.time = time
        self.amount = amount
        self.espressocount = espressocount
        self.mugweight = mugweight
        self.$coffee.id = coffeeID
    }
}
