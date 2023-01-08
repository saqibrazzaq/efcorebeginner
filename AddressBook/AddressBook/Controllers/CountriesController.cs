using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountriesController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new CountryReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] CountryReqSearch dto)
        {
            var res = _countryService.Search(dto);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _countryService.Count();
            return Ok(res);
        }

        [HttpGet("{countryId}")]
        public IActionResult Get(int countryId)
        {
            var res = _countryService.Get(countryId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(CountryReqEdit dto)
        {
            var res = _countryService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{countryId}")]
        public IActionResult Update(int countryId, CountryReqEdit dto)
        {
            var res = _countryService.Update(countryId, dto);
            return Ok(res);
        }

        [HttpDelete("{countryId}")]
        public IActionResult Delete(int countryId)
        {
            _countryService.Delete(countryId);
            return NoContent();
        }
    }
}
