using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Person.Common;
using Person.Dtos;
using Person.Services;

namespace Person.Controllers
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

        [HttpPost]
        public IActionResult Create(PersonReqEdit dto)
        {
            var res = _personService.Create(dto);
            return Ok(res);
        } 

        [HttpGet]
        public IActionResult GetAll()
        {
            var res = _personService.GetAll();
            return Ok(res);
        }

        [HttpGet("{personId}")]
        public IActionResult Get(int personId)
        {
            var res = _personService.Get(personId);
            return Ok(res);
        }

        [HttpPut("{personId}")]
        public IActionResult Update(int personId, PersonReqEdit dto)
        {
            var res = _personService.Update(personId, dto);
            return Ok(res);
        }

        [HttpDelete("{personId}")]
        public IActionResult Delete(int personId)
        {
            _personService.Delete(personId);
            return NoContent();
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _personService.Count();
            return Ok(res);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonReqSearch dto)
        {
            var res = _personService.Search(dto);
            return Ok(res);
        }
    }
}
