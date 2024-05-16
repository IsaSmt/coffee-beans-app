import Foundation
import Fluent
import Vapor

final class CoffeeKeywordPivot: Model {
    static let schema = "coffee_keyword_pivot"
    
    @ID
    var id: UUID?
    
    @Parent(key: "coffee_id")
    var coffee: Coffee
    
    @Parent(key: "keyword_id")
    var keyword: Keyword
    
    init() {}
    
    init(id: UUID? = nil, coffeeID: UUID, keywordID: UUID) {
        self.id = id
        self.$coffee.id = coffeeID
        self.$keyword.id = keywordID
    }
}
