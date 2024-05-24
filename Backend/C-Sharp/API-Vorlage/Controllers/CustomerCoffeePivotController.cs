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
    /// This endpoint manages all operations for the customer coffee pivot.
    /// </summary>
    [Route("api/customerpivots")]
    [ApiController]
    public class CustomerCoffeePivotController : ControllerBase
    {
        private Context context;
        public CustomerCoffeePivotController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all customer coffee combinations
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<CustomerCoffeePivot[]> GetAllCustomerCoffeePivots() {
        return Ok(context.CustomerCoffeePivots.ToArray());
    }

    /// <summary>
    /// Returns the customer Coffe combination with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CustomerCoffeePivot> GetCustomerCoffeePivot(int id) {
        var customercoffeepivot = context.CustomerCoffeePivots.Where(ccp => ccp.Id == id).FirstOrDefault();
        if (customercoffeepivot == null) return NotFound();
        return Ok(customercoffeepivot);
    }

    /// <summary>
    /// Adds a new combination
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CustomerCoffeePivot>> AddCustomerCoffeePivot([FromBody] CustomerCoffeePivot customerCoffeePivot) {
        if (ModelState.IsValid) {

            // checks if the given Coffee ID exists inside the database
            if (context.Coffees.Where(c => c.Id == customerCoffeePivot.Coffee).Any() is false){
            return NotFound("Kaffee nicht gefunden.");
            }

            // checks if the given customer ID exists inside the database
            if (context.Customers.Where(cu => cu.Id == customerCoffeePivot.Customer).Any() is false){
            return NotFound("Kunde nicht gefunden.");
            }

            //test if combination already
            if (context.CustomerCoffeePivots.Where(ccp => ccp.Id == customerCoffeePivot.Id).FirstOrDefault() != null)
                return Conflict(); //combination with id already exists, we return a conflict
        
            context.CustomerCoffeePivots.Add(customerCoffeePivot);
            await context.SaveChangesAsync();

            return Ok(customerCoffeePivot); //we return the combination
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of plz
    }

    // find every combination between coffee and recipe for one or the other certain ID
    [HttpGet("CustomerCoffeeCustomerQuery")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CustomerCoffeePivot[]> CustomerCoffeePivots([FromQuery] int? customerID = null, int? coffeeID = null){
        if (customerID == null && coffeeID == null) 
        {
            // no id given
            return BadRequest("Kunde oder Kaffee müssen angegeben werden.");
        }
        else if (customerID != null && coffeeID == null)
        {
            // only customer given
            if (customerID != null && context.Customers.Where(cu => cu.Id == customerID).Any() is false){
                return NotFound("Kunde nicht gefunden.");
            }

            var r = context.CustomerCoffeePivots.Where(ccp =>
                (customerID == null || ccp.Customer == customerID) 
            ).ToArray();

            return Ok(r);
        }
        else if (customerID == null && coffeeID != null)
        {
            // only coffeeID given
            if (coffeeID != null && context.Coffees.Where(cf => cf.Id == coffeeID).Any() is false){
                return NotFound("Kaffee nicht gefunden.");
            }

            var r = context.CustomerCoffeePivots.Where(ccp =>
                (coffeeID == null || ccp.Coffee == coffeeID) 
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