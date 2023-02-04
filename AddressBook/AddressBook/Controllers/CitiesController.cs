using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new CityReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] CityReqSearch dto)
        {
            var res = _cityService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{cityId}")]
        public IActionResult Get(int cityId)
        {
            var res = _cityService.Get(cityId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _cityService.Count();
            return Ok(res);
        }

        [HttpGet("count/{stateId}")]
        public IActionResult CountByStateId(int stateId)
        {
            var res = _cityService.Count(stateId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(CityReqEdit dto)
        {
            var res = _cityService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{cityId}")]
        public IActionResult Update(int cityId, CityReqEdit dto)
        {
            var res = _cityService.Update(cityId, dto);
            return Ok(res);
        }

        [HttpDelete("{cityId}")]
        public IActionResult Delete(int cityId)
        {
            _cityService.Delete(cityId);
            return NoContent();
        }
    }
}
