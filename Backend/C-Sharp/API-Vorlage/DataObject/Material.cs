using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Material  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string MaterialName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string MaterialArt { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Werk { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Branche { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Lagerort { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Materialkurztext { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Basismengeneinheit { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Warengruppe { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Sparte { get; set; }

        public int Bruttogewicht { get; set; }
        public int Nettogewicht { get; set; }
                
        [MinLength(1)]
        [MaxLength(100)]
        public string Gewichtseinheit { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        public string Sprache { get; set; }

        public int Steuerklasse { get; set; }

        public int Staffelmenge { get; set; }

        public int Transportgruppe { get; set; }

        public int Lagergruppe { get; set; }

        public int Planlieferzeit { get; set; }

        public int Bewertungsklasse { get; set; }

        public double GleitenderPreis { get; set; }
    }
}
