using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Supplier  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Anrede { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public int Suchbegriff { get; set; }
        
        // Hier finden sich Straße, Hnr, PLZ, Ort und Land
        [MinLength(1)]
        [MaxLength(100)]
        public string Adresse { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Region { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Sprache { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Steuernummer { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Buchungskreis { get; set; }

        public int Abstimmkonto { get; set; }

        public int Zahlungsverkehr { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Zahlungsbedingung { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Korrespondenz { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Bestellwaehrung { get; set; }
    }
}
