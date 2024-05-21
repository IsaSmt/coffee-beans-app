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
    /// This endpoint manages all operations for Coffees.
    /// </summary>
    [Route("api/coffees")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        private Context context;
        public CoffeeController (Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all coffees.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Coffee[]> GetAllMaterials() {
            return Ok(context.Coffees.ToArray());
        }

        /// <summary>
        /// Returns the coffee with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Coffee> GetMaterial(int id) {
            var coffee = context.Coffees.Where(cf => cf.Id == id).FirstOrDefault();
            if (coffee == null) return NotFound();
            return Ok(coffee);
        }

        /// <summary>
        /// Adds a coffee.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Coffee>> AddCoffee([FromBody] Coffee coffee) {
            if (ModelState.IsValid) {
                
                // checks if the given Roastery ID exists inside the database
                if (context.Roasteries.Where(r => r.Id == coffee.Roastery).Any() is false){
                    return NotFound("Rösterei nicht gefunden.");
                }

                //test if coffee already exists
                if (context.Coffees.Where(cf => cf.Id == coffee.Id).FirstOrDefault() != null)
                    return Conflict(); //coffee with id already exists, we return a conflict

                context.Coffees.Add(coffee);
                await context.SaveChangesAsync();

                return Ok(coffee); //we return the coffee
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of Material
        }

        [HttpGet("RoasteryQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Coffee[]> Coffees([FromQuery] int? roasteryID = null){
            if (roasteryID == null) return BadRequest("Rösterei muss angegeben werden.");

                if (roasteryID != null && context.Roasteries.Where(r => r.Id == roasteryID).Any() is false){
                    return NotFound("Rösterei nicht gefunden.");
                }

            var r = context.Coffees.Where(c =>
                (roasteryID == null || c.Roastery == roasteryID) 
            ).ToArray();

            return Ok(r);
        }
    }
}