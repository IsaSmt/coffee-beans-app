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
    /// This endpoint manages all operations for Origin
    /// </summary>
    [Route("api/origins")]
    [ApiController]
    public class OriginController : ControllerBase
    {
        private Context context;
        public OriginController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all Origins
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Origin[]> GetAllOriginss() {
            return Ok(context.Origins.ToArray());
        }

        /// <summary>
        /// Returns the Origin with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Origin> GetOrigin(int id) {
            var origin = context.Origins.Where(o => o.Id == id).FirstOrDefault();
            if (origin == null) return NotFound();
            return Ok(origin);
        }

        /// <summary>
        /// Adds an origin
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Origin>> AddOrigin([FromBody] Origin origin) {
            if (ModelState.IsValid) {

                //test if Origin already exists
                if (context.Origins.Where(o => o.Id == origin.Id).FirstOrDefault() != null)
                    return Conflict(); //origin with id already exists, we return a conflict
            
                context.Origins.Add(origin);
                await context.SaveChangesAsync();

                return Ok(origin); //we return the origin
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of plz
        }

        /// <summary>
        /// Deletes the Origin with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteOrigin(int id)
        {
            var origin = context.Origins.Where(o => o.Id == id).FirstOrDefault();
            if (origin == null)
            {
                return NotFound();
            }

            context.Origins.Remove(origin);
            await context.SaveChangesAsync();

            return NoContent();
        }

    }
}