using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataObject;
using API.Store;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This endpoint manages all operations for the recipe coffee pivot.
    /// </summary>
    [Route("api/recipecoffeepivots")]
    [ApiController]
    public class RecipeCoffeePivotController : ControllerBase
    {
        private Context context;
        public RecipeCoffeePivotController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all recipe coffee combinations
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<RecipeCoffeePivot[]> GetAllRecipeCoffeePivots() {
        return Ok(context.RecipeCoffeePivots.ToArray());
    }

    /// <summary>
    /// Returns the recipe Coffe combination with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<RecipeCoffeePivot> GetRecipeCoffeePivot(int id) {
        var recipecoffeepivot = context.RecipeCoffeePivots.Where(rcp => rcp.Id == id).FirstOrDefault();
        if (recipecoffeepivot == null) return NotFound();
        return Ok(recipecoffeepivot);
    }

    /// <summary>
    /// Adds a new combination
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<RecipeCoffeePivot>> AddPRecipeCoffeePivot([FromBody] RecipeCoffeePivot recipeCoffeePivot) {
        if (ModelState.IsValid) {

            // checks if the given Coffee ID exists inside the database
            if (context.Coffees.Where(c => c.Id == recipeCoffeePivot.Coffee).Any() is false){
            return NotFound("Kaffee nicht gefunden.");
            }

            // checks if the given postalcode ID exists inside the database
            if (context.Recipes.Where(r => r.Id == recipeCoffeePivot.Recipe).Any() is false){
            return NotFound("Rezept nicht gefunden.");
            }

            //test if combination already
            if (context.RecipeCoffeePivots.Where(rcp => rcp.Id == recipeCoffeePivot.Id).FirstOrDefault() != null)
                return Conflict(); //combination with id already exists, we return a conflict
        
            context.RecipeCoffeePivots.Add(recipeCoffeePivot);
            await context.SaveChangesAsync();

            return Ok(recipeCoffeePivot); //we return the plz
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of plz
    }

    // find every combination between coffee and recipe for one or the other certain ID
    [HttpGet("RecipeCoffeeCustomerQuery")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<RecipeCoffeePivot[]> RecipeCoffeePivots([FromQuery] int? recipeID = null, int? coffeeID = null){
        if (recipeID == null && coffeeID == null) 
        {
            // no id given
            return BadRequest("Rezept oder Kaffee müssen angegeben werden.");
        }
        else if (recipeID != null && coffeeID == null)
        {
            // only recipeID given
            if (recipeID != null && context.Recipes.Where(re => re.Id == recipeID).Any() is false){
                return NotFound("Rezept nicht gefunden.");
            }

            var r = context.RecipeCoffeePivots.Where(rcp =>
                (recipeID == null || rcp.Recipe == recipeID) 
            ).ToArray();

            return Ok(r);
        }
        else if (recipeID == null && coffeeID != null)
        {
            // only coffeeID given
            if (coffeeID != null && context.Coffees.Where(cf => cf.Id == coffeeID).Any() is false){
                return NotFound("Kaffee nicht gefunden.");
            }

            var r = context.Reviews.Where(rw =>
                (coffeeID == null || rw.Coffee == coffeeID) 
            ).ToArray();

            return Ok(r);
        }
        else
        {
            return BadRequest("Bitte nur EINE ID maximal eingeben");
        }

        }

    }
}