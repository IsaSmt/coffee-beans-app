using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Offer  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Anfrageart { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Anfragedatum { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Werk { get; set; }
        
        [Required]
        public int Bestellanforderung { get; set; }
        
        [Required]
        public int Lieferant { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Lagerort { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Submission { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Angebotsfrist { get; set; }
    }
}
