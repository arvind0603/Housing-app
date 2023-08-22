using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace BackEnd.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<City, CityDto>().ReverseMap();
        
        }
    }


}