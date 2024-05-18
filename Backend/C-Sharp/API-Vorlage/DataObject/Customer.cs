using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class PLZ  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // postcode for a certain village/city
        // to include leading 0 as well as alphanummeric characters, postcode will stay as string
        public string Postcode { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // city, village, ...
        public string Ort { get; set; }

       
    }
}
