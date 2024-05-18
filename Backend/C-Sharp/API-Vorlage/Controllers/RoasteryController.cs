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
    /// This endpoint manages all operations for Roasteries
    /// </summary>
    [Route("api/roastieres")]
    [ApiController]
    public class RoasteryController : ControllerBase
    {
        private Context context;
        public RoasteryController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all Roasteries
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<Roastery[]> GetAllRoasteriess() {
        return Ok(context.Roasteries.ToArray());
    }

    /// <summary>
    /// Returns the roastery with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Roastery> GetRoastery(int id) {
        var roastery = context.Roasteries.Where(r => r.Id == id).FirstOrDefault();
        if (roastery == null) return NotFound();
        return Ok(roastery);
    }

    /// <summary>
    /// Adds a Roastery
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Roastery>> AddRoastery([FromBody] Roastery roastery) {
        if (ModelState.IsValid) {

            //test if Roastery already exists
            if (context.Roasteries.Where(r => r.Id == roastery.Id).FirstOrDefault() != null)
                return Conflict(); //roastery with id already exists, we return a conflict
        
            context.Roasteries.Add(roastery);
            await context.SaveChangesAsync();

            return Ok(roastery); //we return the roastery
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of roastery
    }

    }
}
