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
        public CoffeeController(Context context)
        {
            this.context = context;
        }

        /// <summary>
        /// Returns all coffees.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Coffee[]> GetAllMaterials()
        {
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
        public ActionResult<Coffee> GetMaterial(int id)
        {
            var coffee = context.Coffees.FirstOrDefault(cf => cf.Id == id);
            if (coffee == null) return NotFound();
            return Ok(coffee);
        }

        /// <summary>
        /// Adds a coffee.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Coffee>> AddCoffee([FromBody] Coffee coffee)
        {
            if (ModelState.IsValid)
            {

                // checks if the given Roastery ID exists inside the database
                if (!context.Roasteries.Any(ro => ro.Id.ToString() == coffee.Roastery))
                {
                    return NotFound("Rösterei nicht gefunden.");
                }

                // checks if the given origin ID exists inside the database
                if (!context.Origins.Any(o => o.Id.ToString() == coffee.Origin))
                {
                    return NotFound("Herkunftsland nicht gefunden.");
                }

                // checks if the given beantype ID exists inside the database
                if (!context.Beantypes.Any(bt => bt.Id.ToString() == coffee.Beantype))
                {
                    return NotFound("Bohnentyp nicht gefunden.");
                }

                // test if coffee already exists
                if (context.Coffees.Any(cf => cf.Id == coffee.Id))
                    return Conflict(); // coffee with id already exists, we return a conflict

                context.Coffees.Add(coffee);
                await context.SaveChangesAsync();

                return Ok(coffee); // we return the coffee
            }
            return BadRequest(ModelState); // Model is not valid -> Validation Annotation of Material
        }

        /// <summary>
        /// Deletes the coffee with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCoffee(int id)
        {
            var coffee = context.Coffees.FirstOrDefault(cf => cf.Id == id);
            if (coffee == null)
            {
                return NotFound();
            }

            context.Coffees.Remove(coffee);
            await context.SaveChangesAsync();

            return NoContent();
        }


        // find every coffee from one certain Roastery, Origin or Bean
        [HttpGet("RoasteryOriginBeanQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Coffee[]> Coffees([FromQuery] string roasteryID = null, string originID = null, string beantypeID = null)
        {
            if (roasteryID == null && originID == null && beantypeID == null)
            {
                // no id given
                return BadRequest("Rösterei, Herkunftsland oder Bohnentyp müssen angegeben werden.");
            }
            else if (roasteryID != null && originID == null && beantypeID == null)
            {
                // only roasteryID given
                if (roasteryID != null && !context.Roasteries.Any(ro => ro.Id.ToString() == roasteryID.ToString()))
                {
                    return NotFound("Rösterei nicht gefunden.");
                }

                var r = context.Coffees.Where(cf =>
                    roasteryID == null || cf.Roastery == roasteryID.ToString()
                ).ToArray();

                return Ok(r);
            }
            else if (roasteryID == null && originID != null && beantypeID == null)
            {
                // only originID given
                if (originID != null && !context.Origins.Any(o => o.Id.ToString() == originID.ToString()))
                {
                    return NotFound("Herkunftsland nicht gefunden.");
                }

                var r = context.Coffees.Where(cf =>
                    originID == null || cf.Origin == originID.ToString()
                ).ToArray();

                return Ok(r);
            }
            else if (roasteryID == null && originID == null && beantypeID != null)
            {
                // only beantype ID given
                if (beantypeID != null && !context.Beantypes.Any(bt => bt.Id.ToString() == beantypeID.ToString()))
                {
                    return NotFound("Bohnentyp nicht gefunden.");
                }

                var r = context.Coffees.Where(cf =>
                    beantypeID == null || cf.Beantype == beantypeID.ToString()
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
