using BackEnd.Data;
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
        private readonly DataContext dataContext;
        public CityController(DataContext dataContext)
        {
            this.dataContext = dataContext;

        }
        //Get api/city
        [HttpGet]
        public async Task<IActionResult> Get() {

            var cities = await dataContext.Cities.ToListAsync();
            return Ok(cities);
        }

        //Post api/city/post (Json object)
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city) {
            await dataContext.Cities.AddAsync(city);
            await dataContext.SaveChangesAsync();
            return Ok(city);
        }


        //Post api/city/add?cityName=New York (string)
        [HttpPost("add")]
        [HttpPost("add/{cityName}")]
        public async Task<IActionResult> AddCity(string cityName) {
            City city = new City();
            city.Name = cityName;
            await dataContext.Cities.AddAsync(city);
            await dataContext.SaveChangesAsync();
            return Ok(city);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id) {

            var city = await dataContext.Cities.FindAsync(id); 
            dataContext.Cities.Remove(city);
            await dataContext.SaveChangesAsync();
            return Ok(id);
        }
    }
}
