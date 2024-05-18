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
        public string name { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // short description of the roastery
        public string beschreibung { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        // way of contacting the orastery
        public string email { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        // way of contacting the roastery
        public string phone { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        // streetname and number in here
        public string street { get; set; }
    }
}
