using BackEnd.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public IActionResult Get() {

            var cities = dataContext.Cities.ToList();
            return Ok(cities);
        }
    }
}
