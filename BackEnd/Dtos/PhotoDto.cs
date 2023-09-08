using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Dtos
{
    public class PhotoDto
    {
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsPrimary { get; set; }
    }
}