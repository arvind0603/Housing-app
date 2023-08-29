using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;

        public PropertyController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        //property/type/2
        [HttpGet("type/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            return Ok(properties);

        }
    }
}