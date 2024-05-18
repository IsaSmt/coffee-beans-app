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
    /// This endpoint manages all operations for Suppliers.
    /// </summary>
    [Route("api/suppliers")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private Context context;
        public SupplierController(Context context) {
            this.context = context;
        }

    /// <summary>
    /// Returns all suppliers.
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<Supplier[]> GetAllSuppliers() {
        return Ok(context.Suppliers.ToArray());
    }

    /// <summary>
    /// Returns the Supplier with a given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Supplier> GetSupplier(int id) {
        var supplier = context.Suppliers.Where(s => s.Id == id).FirstOrDefault();
        if (supplier == null) return NotFound();
        return Ok(supplier);
    }

    /// <summary>
    /// Adds a supplier.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Supplier>> AddSupplier([FromBody] Supplier supplier) {
        if (ModelState.IsValid) {

            //test if supplier already exists
            if (context.Suppliers.Where(s => s.Id == supplier.Id).FirstOrDefault() != null)
                return Conflict(); //supplier with id already exists, we return a conflict
        
            context.Suppliers.Add(supplier);
            await context.SaveChangesAsync();

            return Ok(supplier); //we return the supplier
        }
        return BadRequest(ModelState); //Model is not valid -> Validation Annotation of Supplier
    }



    }
}