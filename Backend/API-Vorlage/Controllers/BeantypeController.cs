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
    /// This endpoint manages all operations for Beantype
    /// </summary>
    [Route("api/beantypes")]
    [ApiController]
    public class BeantypeController : ControllerBase
    {
        private Context context;
        public BeantypeController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all Beantypes
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<Beantype[]> GetAllBeantypes() {
        return Ok(context.Beantypes.ToArray());
    }

    /// <summary>
    /// Returns the Beantype with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Beantype> GetBeantype(int id) {
        var beantype = context.Beantypes.Where(bt => bt.Id == id).FirstOrDefault();
        if (beantype == null) return NotFound();
        return Ok(beantype);
    }

    /// <summary>
    /// Adds a beantype
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Beantype>> AddBeantype([FromBody] Beantype beantype) {
        if (ModelState.IsValid) {

            //test if beantype already exists
            if (context.Beantypes.Where(bt => bt.Id == beantype.Id).FirstOrDefault() != null)
                return Conflict(); //beantype with id already exists, we return a conflict
        
            context.Beantypes.Add(beantype);
            await context.SaveChangesAsync();

            return Ok(beantype); //we return the beantype
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of beantype
    }

    }
}