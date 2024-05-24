using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Recipe  {
        
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // Siebträger, French Press, Vollautomat
        public string Machine { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // how much time to finish
        // please add "sec." in the frontend
        public int Time { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // how much coffee
        // please add "g" in the frontend
        public float Amount { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        // how many espressos are going to be produced
        public int Espressocount { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
         // weight of the mug after the coffee ran through
        // please add "g" in the frontend
        public float Mugweight { get; set; }

    }
}
