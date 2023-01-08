using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimezonesController : ControllerBase
    {
        private readonly ITimezoneService _timezoneService;

        public TimezonesController(ITimezoneService timezoneService)
        {
            _timezoneService = timezoneService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new TimezoneReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] TimezoneReqSearch dto)
        {
            var res = _timezoneService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{timezoneId}")]
        public IActionResult Get(int timezoneId)
        {
            var res = _timezoneService.Get(timezoneId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(TimezoneReqEdit dto)
        {
            var res = _timezoneService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{timezoneId}")]
        public IActionResult Update(int timezoneId, TimezoneReqEdit dto)
        {
            var res = _timezoneService.Update(timezoneId, dto);
            return Ok(res);
        }

        [HttpDelete("{timezoneId}")]
        public IActionResult Delete(int timezoneId)
        {
            _timezoneService.Delete(timezoneId);
            return NoContent();
        }
    }
}
