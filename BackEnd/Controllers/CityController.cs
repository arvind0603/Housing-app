﻿using System.Collections.Generic;
using AutoMapper;
using BackEnd.Data;
using BackEnd.Data.Repo;
using BackEnd.Dtos;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        // private readonly DataContext dataContext;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
            // this.dataContext = dataContext;

        }
        //Get api/city
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get() {
            // throw new UnauthorizedAccessException();

            var cities = await uow.CityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

            // var citiesDto = from c in cities
            // select new CityDto ()
            // {
            //     Id = c.Id,
            //     Name = c.Name
            // };

            return Ok(citiesDto);
        }

        //Post api/city/post (Json object)
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto) {

            // var city = new City {
            //     Name = cityDto.Name,
            //     LastUpdatedBy = 1,
            //     LastUpdatedOn = DateTime.Now
            // };

            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto) {

            if (id != cityDto.Id){
                return BadRequest("Update not allowed");
            }
            var cityFromDb = await uow.CityRepository.FindCity(id);

            if (cityFromDb == null){
                return BadRequest("Update not allowed Db");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            throw new Exception("Some unknown error occured");
            await uow.SaveAsync();
            return StatusCode(200);

        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto) {

            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);

        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch) {

            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);

        }
    }
}
