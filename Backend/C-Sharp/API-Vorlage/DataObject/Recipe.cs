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
        public string machine { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public int time { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string amount { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public int espressocount { get; set; }
        
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string mugweight { get; set; }

    }
}
