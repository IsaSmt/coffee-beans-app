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
    /// This endpoint manages all operations for Orders.
    /// </summary>
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private Context context;
        public OrderController(Context context) {
            this.context = context;
        }

        /// <summary>
        /// Returns all orders.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Order[]> GetAllOrders() {
            return Ok(context.Orders.ToArray());
        }

        /// <summary>
        /// Returns the order with a given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Customer> GetOrder(int id) {
            var order = context.Orders.Where(o => o.Id == id).FirstOrDefault();
            if (order == null) return NotFound();
            return Ok(order);
        }

        /// <summary>
        /// Adds a order.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Order>> AddOrder([FromBody] Order order) {
            if (ModelState.IsValid) {

                if (context.Materials.Where(m => m.Id == order.Material).Any() is false){
                    return NotFound("Material nicht gefunden.");
                }

                //test if order already exists
                if (context.Orders.Where(o => o.Id == order.Id).FirstOrDefault() != null)
                    return Conflict(); //order with id already exists, we return a conflict

                context.Orders.Add(order);
                await context.SaveChangesAsync();

                return Ok(order); //we return the order
            }
            return BadRequest(ModelState); //Model is not valid -> Validation Annotation of order
        }

        [HttpGet("MaterialQuery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Order[]> Orders([FromQuery] int? materialID = null){
            if (materialID == null) return BadRequest("Material muss angegeben werden.");

                if (materialID != null && context.Materials.Where(m => m.Id == materialID).Any() is false){
                    return NotFound("Material nicht gefunden.");
                }

            var r = context.Orders.Where(o =>
                (materialID == null || o.Material == materialID) 
            ).ToArray();

            return Ok(r);
        }

    }
}