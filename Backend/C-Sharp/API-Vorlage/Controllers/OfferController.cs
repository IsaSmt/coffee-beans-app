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
    /// This endpoint manages all operations for Offers.
    /// </summary>
    [Route("api/offers")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private Context context;
        public OfferController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all Offers.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Offer[]> GetAllOfferss() {
            return Ok(context.Offers.ToArray());
        }

        /// <summary>
        /// Returns the offer with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Offer> GetOffer(int id) {
            var offer = context.Offers.Where(o => o.Id == id).FirstOrDefault();
            if (offer == null) return NotFound();
            return Ok(offer);
        }


        /// <summary>
        /// Adds a offer.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Offer>> AddOffer([FromBody] Offer offer) {
            if (ModelState.IsValid) {

                if (context.PLZs.Where(p => p.Id == offer.Lieferant).Any() is false){
                    return NotFound("Lieferant nicht gefunden.");
                }

                if(context.Orders.Where(o => o.Id == offer.Bestellanforderung).Any() is false){
                    return NotFound("Bestellanforderung nicht gefunden.");
                }
                
                //test if offer already exists
                if (context.Offers.Where(o => 
                    o.Lieferant == offer.Lieferant &&
                    o.Bestellanforderung == offer.Bestellanforderung).FirstOrDefault() != null)
                    return Conflict(); //offer with id already exists, we return a conflict

                context.Offers.Add(offer);
                await context.SaveChangesAsync();

                return Ok(offer); //we return the offer
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of Offer
        }

        [HttpGet("Bestellung-Lieferant-RelationQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Offer[]> GetOffers([FromQuery] int? lieferant = null, int? bestellanforderung = null){
            if (bestellanforderung == null && lieferant ==null) return BadRequest("Bestellanforderung und/oder Lieferant muss angegeben werden.");

                if (bestellanforderung != null && context.Orders.Where(o => o.Id == bestellanforderung).Any() is false){
                    return NotFound("Bestellanforderung nicht gefunden.");
                }

                if(lieferant != null && context.PLZs.Where(p => p.Id == lieferant).Any() is false){
                    return NotFound("Lieferant nicht gefunden.");
                }

            var r = context.Offers.Where(o =>
                (lieferant == null || o.Lieferant == lieferant) 
                &&
                (bestellanforderung == null || o.Bestellanforderung == bestellanforderung)
            ).ToArray();

            return Ok(r);
        }

    }
}