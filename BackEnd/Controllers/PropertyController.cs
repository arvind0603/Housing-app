using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        public readonly IMapper mapper;

        public PropertyController(IUnitOfWork uow, IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;
        }

        //property/list/2
        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDto = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDto);

        }

        //property/detail/2
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDto = mapper.Map<PropertyDetailDto>(property);
            return Ok(propertyDto);

        }

        //property/add
        [HttpPost("add/")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            var userId = GetUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);

        }
    }

}