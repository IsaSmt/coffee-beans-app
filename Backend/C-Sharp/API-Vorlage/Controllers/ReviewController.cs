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
                
                // checks if the given Roastery ID exists inside the database
                if (context.Roasteries.Where(ro => ro.Id == review.Roastery).Any() is false){
                    return NotFound("Rösterei nicht gefunden.");
                }

                // checks if the given Coffee ID exists inside the database
                if (context.Coffees.Where(cf => cf.Id == review.Coffee).Any() is false){
                    return NotFound("Kaffee nicht gefunden.");
                }

                // checks if the given Customer ID exists inside the database
                if (context.Customers.Where(cu => cu.Id == review.Customer).Any() is false){
                    return NotFound("Kunde nicht gefunden.");
                }

                //test if postalcode already exists
                if (context.Reviews.Where(rw => rw.Id == review.Id).FirstOrDefault() != null)
                    return Conflict(); //review with id already exists, we return a conflict
            
                context.Reviews.Add(review);
                await context.SaveChangesAsync();

                return Ok(review); //we return the review
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of review
        }
    
        // find every review from one certain roastery
        [HttpGet("RoasteryQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Review[]> Reviews([FromQuery] int? roasteryID = null){
            if (roasteryID == null) return BadRequest("Rösterei muss angegeben werden.");

                if (roasteryID != null && context.Roasteries.Where(ro => ro.Id == roasteryID).Any() is false){
                    return NotFound("Rösterei nicht gefunden.");
                }

            var r = context.Reviews.Where(rw =>
                (roasteryID == null || rw.Roastery == roasteryID) 
            ).ToArray();

            return Ok(r);
        }

        // find every review from one certain coffee
        [HttpGet("CoffeeQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Review[]> Reviews([FromQuery] int? coffeeID = null){
            if (coffeeID == null) return BadRequest("Kaffee muss angegeben werden.");

                if (coffeeID != null && context.Coffees.Where(cf => cf.Id == coffeeID).Any() is false){
                    return NotFound("Kaffee nicht gefunden.");
                }

            var r = context.Reviews.Where(rw =>
                (coffeeID == null || rw.Roastery == coffeeID) 
            ).ToArray();

            return Ok(r);
        }

        // find every review from one certain customer
        [HttpGet("CustomerQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Review[]> Reviews([FromQuery] int? customerID = null){
            if (customerID == null) return BadRequest("Kunde muss angegeben werden.");

                if (customerID != null && context.Customers.Where(cu => cu.Id == customerID).Any() is false){
                    return NotFound("Kunde nicht gefunden.");
                }

            var r = context.Reviews.Where(rw =>
                (customerID == null || rw.Roastery == customerID) 
            ).ToArray();

            return Ok(r);
        }
    }
}