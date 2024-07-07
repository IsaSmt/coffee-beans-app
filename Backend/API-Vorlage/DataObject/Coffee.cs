using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Coffee  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string CoffeeName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        // small description about the coffee
        public string CoffeeDescription { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // connection between coffee and origin
        public string Origin { get; set; }

        // connection between coffee and roastery
        public string Roastery { get; set; }

        // connection between coffee and beantype
        [Required]
        public string Beantype { get; set; }

        // da es sich hier um eine nummer handelt kann min max nicht
        // genutzt werden. lieber mit dem intervall range arbeiten
        [Range(0, 1000)]
        // Preis
        public int CoffeePrice { get; set; }

        // da es sich hier um eine nummer handelt kann min max nicht
        // genutzt werden. lieber mit dem intervall range arbeiten
        [Range(0, 1000)]
        // gewicht des kaffees
        public int CoffeeWeight { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        // when got the coffee roasted
        public string Roastdate { get; set; }
        
        [MinLength(1)]
        [MaxLength(100)]
        // Honey, Washed, Natural ....
        public string Processing { get; set; }
    }
}
