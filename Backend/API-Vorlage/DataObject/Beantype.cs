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
        public string TypeDefinition { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        // general data
        public string TypeExplanation { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(250)]
        // Koffeingehalt
        public string CaffeineAmount { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(250)]
        // Bohnenform und Größe
        public string BeanFormSize { get; set; }

        [MinLength(1)]
        [MaxLength(500)]
        // Geschmacksprofil
        public string TasteType { get; set; }
       
        [MinLength(1)]
        [MaxLength(500)]
        // Aroma
        public string AromaType { get; set; }

        // da es sich hier um eine nummer handelt kann min max nicht
        // genutzt werden. lieber mit dem intervall range arbeiten
        [Range(0, 1000)]
        // Durchschnittspreis
        public float AvgPrice { get; set; }

    }
}
