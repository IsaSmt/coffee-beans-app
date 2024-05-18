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
    /// This endpoint manages all operations for Materials.
    /// </summary>
    [Route("api/materials")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private Context context;
        public MaterialController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all Materials.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Material[]> GetAllMaterials() {
            return Ok(context.Materials.ToArray());
        }

        /// <summary>
        /// Returns the material with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Material> GetMaterial(int id) {
            var material = context.Materials.Where(m => m.Id == id).FirstOrDefault();
            if (material == null) return NotFound();
            return Ok(material);
        }

        /// <summary>
        /// Adds a Material.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Material>> AddMaterial([FromBody] Material material) {
            if (ModelState.IsValid) {

                //test if material already exists
                if (context.Materials.Where(m => m.Id == material.Id).FirstOrDefault() != null)
                    return Conflict(); //material with id already exists, we return a conflict

                context.Materials.Add(material);
                await context.SaveChangesAsync();

                return Ok(material); //we return the material
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of Material
        }


    }
}