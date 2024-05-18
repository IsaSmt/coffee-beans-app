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
    /// This endpoint manages all operations for Reviews
    /// </summary>
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private Context context;
        public ReviewController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all reviews
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<Review[]> GetAllReviews() {
        return Ok(context.Reviews.ToArray());
    }

    /// <summary>
    /// Returns the review with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Review> GetReview(int id) {
        var review = context.Reviews.Where(rw => rw.Id == id).FirstOrDefault();
        if (review == null) return NotFound();
        return Ok(review);
    }

    /// <summary>
    /// Adds a review
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Review>> AddReview([FromBody] Review review) {
        if (ModelState.IsValid) {

            //test if postalcode already exists
            if (context.Reviews.Where(rw => rw.Id == review.Id).FirstOrDefault() != null)
                return Conflict(); //review with id already exists, we return a conflict
        
            context.Reviews.Add(review);
            await context.SaveChangesAsync();

            return Ok(review); //we return the review
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of review
    }

    }
}