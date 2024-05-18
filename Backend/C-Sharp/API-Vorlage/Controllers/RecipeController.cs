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
    /// This endpoint manages all operations for recipe.
    /// </summary>
    [Route("api/recipes")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private Context context;
        public RecipeController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all recipes.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Recipe[]> GetAllRecipes() {
            return Ok(context.Recipes.ToArray());
        }

        /// <summary>
        /// Returns the recipe with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Keyword> GetRecipe(int id) {
            var recipe = context.Recipes.Where(r => r.Id == id).FirstOrDefault();
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }

    /// <summary>
    /// Adds a recipe .
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Recipe>> AddRecipe([FromBody] Recipe recipe) {
        if (ModelState.IsValid) {

            //test if recipe already exists
            if (context.Recipes.Where(r => r.Id == recipe.Id).FirstOrDefault() != null)
                return Conflict(); //recipe with id already exists, we return a conflict
        
            context.Recipes.Add(recipe);
            await context.SaveChangesAsync();

            return Ok(recipe); //we return the recipe
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of recipe
    }


    }
}