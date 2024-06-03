using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Roastery  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string RoasteryName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(250)]
        // short description of the roastery
        public string RoasteryDescription { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // way of contacting the orastery
        public string Email { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        // way of contacting the roastery
        public string Phone { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // streetname and number in here
        public string Street { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
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
