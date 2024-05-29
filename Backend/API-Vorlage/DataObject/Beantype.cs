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

       
    }
}
