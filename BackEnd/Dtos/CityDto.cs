using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage = "Name is required field")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Only Numerics are not allowed")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}