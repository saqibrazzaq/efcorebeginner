using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonPhonesController : ControllerBase
    {
        private readonly IPersonPhoneService _personPhoneService;

        public PersonPhonesController(IPersonPhoneService personPhoneService)
        {
            _personPhoneService = personPhoneService;
        }

        // GET: api/<PersonPhonesController>
        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonPhoneReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonPhoneReqSearch dto)
        {
            var res = _personPhoneService.Search(dto);
            return Ok(res);
        }

        // GET api/<PersonPhonesController>/5
        [HttpGet("{personPhoneId}")]
        public IActionResult Get(int personPhoneId)
        {
            var res = _personPhoneService.Get(personPhoneId);
            return Ok(res);
        }

        // POST api/<PersonPhonesController>
        [HttpPost]
        public IActionResult Create([FromBody] PersonPhoneReqEdit dto)
        {
            var res = _personPhoneService.Create(dto);
            return Ok(res);
        }

        // PUT api/<PersonPhonesController>/5
        [HttpPut("{personPhoneId}")]
        public IActionResult Update(int personPhoneId, [FromBody] PersonPhoneReqEdit dto)
        {
            var res = _personPhoneService.Update(personPhoneId, dto);
            return Ok(res);
        }

        // DELETE api/<PersonPhonesController>/5
        [HttpDelete("{personPhoneId}")]
        public IActionResult Delete(int personPhoneId)
        {
            _personPhoneService.Delete(personPhoneId);
            return NoContent();
        }
    }
}
