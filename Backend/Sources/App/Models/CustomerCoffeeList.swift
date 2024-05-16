import Foundation
import Fluent
import Vapor

final class CustomerCoffeeListPivot: Model {
    static let schema = "customer_coffee_list"  // The name of the pivot table
    
    @ID
    var id: UUID?
    
    @Parent(key: "customer_id")
    var customer: Customer
    
    @Parent(key: "coffee_id")
    var coffee: Coffee
    
    init() {}
    
    init(id: UUID? = nil, customerID: UUID, coffeeID: UUID) {
        self.id = id
        self.$customer.id = customerID
        self.$coffee.id = coffeeID
    }
}

