using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Beantype  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // Beantype (arabica, robusta)
        public string TypeDefintion { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        // general data
        public string TypeExplaination { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        // Koffeingehalt
        public string cafeineAmount { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        // Bohnenform und Größe
        public string beanFormSize { get; set; }

        [MinLength(1)]
        [MaxLength(500)]
        // taste aka. geschmaksprofil
        public string tasteType { get; set; }
       
        [MinLength(1)]
        [MaxLength(500)]
        // aroma aka. aroma
        public string aromaType { get; set; }

        [MinLength(1)]
        [MaxLength(500)]
        // durchschnittspreis
        public float avgPrice { get; set; }

    }
}
