using System;
using System.Collections.Generic;
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
        // connection between coffee and origin
        public int Origin { get; set; }

        // connection between coffee and roastery
        [Required]
        public int Roastery { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        // Arabica, Robusta, ...
        public string BeanType { get; set; }

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
