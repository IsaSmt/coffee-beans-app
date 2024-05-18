using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Order  {
        
        [Key]
        public int Id { get; set; }

        [Required]
        public int Material { get; set; }

        [Required]
        public double Bewertungspreis { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Waehrung { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Werk { get; set; }

        public int Preiseinheit { get; set; }
        
        public int Anforderungsmenge { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Lieferdatum { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Buchungskreis { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Laenderschluessel { get; set; }
        
    }
}
