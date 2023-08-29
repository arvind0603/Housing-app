
using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    public class FurnishingTypeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFurnishingTypes()
        {
            var FurnishingTypes = await this.uow.FurnishingTypeRepository.GetFurnishingTypesAsync();
            var FurnishingTypesDto = mapper.Map<IEnumerable<KeyValuePairDto>>(FurnishingTypes);

            return Ok(FurnishingTypesDto);
        }


    }
}