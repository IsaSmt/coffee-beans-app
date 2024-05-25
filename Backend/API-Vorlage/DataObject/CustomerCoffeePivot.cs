using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class CustomerCoffeePivot  {

        [Key]
        public int Id { get; set; }

        [Required]
        // Coffee ID
        public int Coffee { get; set; }

        [Required]
        // Customer ID
        public int Customer { get; set; }

       
    }
}
