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
    /// This endpoint manages all operations for the keyword coffee pivot.
    /// </summary>
    [Route("api/keywordcoffeepivots")]
    [ApiController]
    public class KeywordCoffeePivotController : ControllerBase
    {
        private Context context;
        public KeywordCoffeePivotController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all keyword coffee combinations
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<KeywordCoffeePivot[]> GetAllKeywordCoffeePivots() {
        return Ok(context.KeywordCoffeePivots.ToArray());
    }

    /// <summary>
    /// Returns the keyword Coffe combination with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<KeywordCoffeePivot> GetKeywordCoffeePivot(int id) {
        var keywordcoffeepivot = context.KeywordCoffeePivots.Where(kcp => kcp.Id == id).FirstOrDefault();
        if (keywordcoffeepivot == null) return NotFound();
        return Ok(keywordcoffeepivot);
    }

    /// <summary>
    /// Adds a new combination
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<KeywordCoffeePivot>> AddKeywordCoffeePivot([FromBody] KeywordCoffeePivot keywordCoffeePivot) {
        if (ModelState.IsValid) {

            // checks if the given Coffee ID exists inside the database
            if (context.Coffees.Where(c => c.Id == keywordCoffeePivot.Coffee).Any() is false){
            return NotFound("Kaffee nicht gefunden.");
            }

            // checks if the given keyword ID exists inside the database
            if (context.Keywords.Where(k => k.Id == keywordCoffeePivot.Keyword).Any() is false){
            return NotFound("Schlagwort nicht gefunden.");
            }

            //test if combination already
            if (context.KeywordCoffeePivots.Where(kcp => kcp.Id == keywordCoffeePivot.Id).FirstOrDefault() != null)
                return Conflict(); //combination with id already exists, we return a conflict
        
            context.KeywordCoffeePivots.Add(keywordCoffeePivot);
            await context.SaveChangesAsync();

            return Ok(keywordCoffeePivot); //we return the combination
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of plz
    }

    // find every combination between coffee and keyword for one or the other certain ID
    [HttpGet("KeywordCoffeeCustomerQuery")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<KeywordCoffeePivot[]> KeywordCoffeePivots([FromQuery] int? keywordID = null, int? coffeeID = null){
        if (keywordID == null && coffeeID == null) 
        {
            // no id given
            return BadRequest("Schlagwort oder Kaffee müssen angegeben werden.");
        }
        else if (keywordID != null && coffeeID == null)
        {
            // only keywordid given
            if (keywordID != null && context.Keywords.Where(k => k.Id == keywordID).Any() is false){
                return NotFound("Schlagwort nicht gefunden.");
            }

            var r = context.KeywordCoffeePivots.Where(kcp =>
                (keywordID == null || kcp.Keyword == keywordID) 
            ).ToArray();

            return Ok(r);
        }
        else if (keywordID == null && coffeeID != null)
        {
            // only coffeeID given
            if (coffeeID != null && context.Coffees.Where(cf => cf.Id == coffeeID).Any() is false){
                return NotFound("Kaffee nicht gefunden.");
            }

            var r = context.KeywordCoffeePivots.Where(kcp =>
                (coffeeID == null || kcp.Coffee == coffeeID) 
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