using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonsController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonReqSearch dto)
        {
            var res = _personService.Search(dto);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(PersonReqEdit dto)
        {
            var res = _personService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{personId}")]
        public IActionResult Update(int personId, PersonReqEdit dto)
        {
            var res = _personService.Update(personId, dto);
            return Ok(res);
        }

        [HttpGet("{personId}")]
        public IActionResult Get(int personId)
        {
            var res = _personService.Get(personId);
            return Ok(res);
        }

        [HttpDelete("{personId}")]
        public IActionResult Delete(int personId)
        {
            _personService.Delete(personId);
            return NoContent();
        }
    }
}
