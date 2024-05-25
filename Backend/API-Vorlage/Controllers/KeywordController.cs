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
    /// This endpoint manages all operations for keyword.
    /// </summary>
    [Route("api/keywords")]
    [ApiController]
    public class KeywordController : ControllerBase
    {
        private Context context;
        public KeywordController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all keywords.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Keyword[]> GetAllKeywords() {
            return Ok(context.Keywords.ToArray());
        }

        /// <summary>
        /// Returns the keyword with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Keyword> GetKeyword(int id) {
            var keyword = context.Keywords.Where(c => c.Id == id).FirstOrDefault();
            if (keyword == null) return NotFound();
            return Ok(keyword);
        }

        /// <summary>
        /// Adds a keyword.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Keyword>> AddKeyword([FromBody] Keyword keyword) {
            if (ModelState.IsValid) {

                //test if keyword already exists
                if (context.Keywords.Where(k => k.Id == keyword.Id).FirstOrDefault() != null)
                    return Conflict(); //keyword with id already exists, we return a conflict

                context.Keywords.Add(keyword);
                await context.SaveChangesAsync();

                return Ok(keyword); //we return the keyword
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of keyword
        }

    }
}