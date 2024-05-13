import Foundation
import Fluent
import Vapor

final class CoffeeRecipePivot: Model {
    static let schema = "coffee_recipe"

    @ID
    var id: UUID?

    @Parent(key: "coffee_id")
    var coffee: Coffee

    @Parent(key: "recipe_id")
    var recipe: Recipe

    init() {}

    init(id: UUID? = nil, coffeeID: UUID, recipeID: UUID) {
        self.id = id
        self.$coffee.id = coffeeID
        self.$recipe.id = recipeID
    }
}
