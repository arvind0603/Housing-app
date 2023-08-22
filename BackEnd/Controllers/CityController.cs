using BackEnd.Data;
using BackEnd.Data.Repo;
using BackEnd.Dtos;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        // private readonly DataContext dataContext;
        private readonly IUnitOfWork uow;

        public CityController(IUnitOfWork uow)
        {
            this.uow = uow;
            // this.dataContext = dataContext;

        }
        //Get api/city
        [HttpGet]
        public async Task<IActionResult> Get() {

            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = from c in cities
            select new CityDto ()
            {
                Id = c.Id,
                Name = c.Name
            };
            return Ok(citiesDto);
        }

        //Post api/city/post (Json object)
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto) {

            var city = new City {
                Name = cityDto.Name,
                LastUpdatedBy = 1,
                LastUpdatedOn = DateTime.Now
            };
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }


        // //Post api/city/add?cityName=New York (string)
        // [HttpPost("add")]
        // [HttpPost("add/{cityName}")]
        // public async Task<IActionResult> AddCity(string cityName) {
        //     City city = new City();
        //     city.Name = cityName;
        //     await dataContext.Cities.AddAsync(city);
        //     await dataContext.SaveChangesAsync();
        //     return Ok(city);
        // }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id) {

            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
