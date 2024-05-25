using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.DataObject {
    public class Review  {

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public float StarRating { get; set; }

        [Required]
        public int Roastery { get; set; }

        [Required]
        public int Coffee { get; set; }

        [Required]
        public int Customer { get; set; }

        [MinLength(1)]
        [MaxLength(250)]
        public string Reason { get; set; }

    }
}
