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
    /// This endpoint manages all operations for Postal codes.
    /// </summary>
    [Route("api/plzs")]
    [ApiController]
    public class PLZController : ControllerBase
    {
        private Context context;
        public PLZController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all postal codes.
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<PLZ[]> GetAllPLZs() {
        return Ok(context.PLZs.ToArray());
    }

    /// <summary>
    /// Returns the postalcode with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PLZ> GetPLZ(int id) {
        var plz = context.PLZs.Where(p => p.Id == id).FirstOrDefault();
        if (plz == null) return NotFound();
        return Ok(plz);
    }

    /// <summary>
    /// Adds a postal code.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<PLZ>> AddPLZ([FromBody] PLZ plz) {
        if (ModelState.IsValid) {

            //test if postalcode already exists
            if (context.PLZs.Where(p => p.Id == plz.Id).FirstOrDefault() != null)
                return Conflict(); //plz with id already exists, we return a conflict
        
            context.PLZs.Add(plz);
            await context.SaveChangesAsync();

            return Ok(plz); //we return the plz
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of plz
    }

    }
}