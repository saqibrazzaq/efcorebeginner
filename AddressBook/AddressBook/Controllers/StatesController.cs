using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new StateReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] StateReqSearch dto)
        {
            var res = _stateService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{stateId}")]
        public IActionResult Get(int stateId)
        {
            var res = _stateService.Get(stateId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _stateService.Count();
            return Ok(res);
        }

        [HttpGet("count/{countryId}")]
        public IActionResult Count(int countryId)
        {
            var res = _stateService.Count(countryId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(StateReqEdit dto)
        {
            var res = _stateService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{stateId}")]
        public IActionResult Update(int stateId, StateReqEdit dto)
        {
            var res = _stateService.Update(stateId, dto);
            return Ok(res);
        }

        [HttpDelete("{stateId}")]
        public IActionResult Delete(int stateId)
        {
            _stateService.Delete(stateId);
            return NoContent();
        }
    }
}
