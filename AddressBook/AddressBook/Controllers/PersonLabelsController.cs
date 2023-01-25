using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonLabelsController : ControllerBase
    {
        private readonly IPersonLabelService _personLabelService;

        public PersonLabelsController(IPersonLabelService personLabelService)
        {
            _personLabelService = personLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonLabelReqSearch dto)
        {
            var res = _personLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonLabelReqSearch());
        }

        [HttpPost]
        public IActionResult Create(PersonLabelReqEdit dto)
        {
            var res = _personLabelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{personLabelId}")]
        public IActionResult Update(int personLabelId, PersonLabelReqEdit dto)
        {
            var res = _personLabelService.Update(personLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{personLabelId}")]
        public IActionResult Delete(int personLabelId)
        {
            _personLabelService.Delete(personLabelId);
            return NoContent();
        }

        [HttpGet("{personLabelId}")]
        public IActionResult Get(int personLabelId)
        {
            var res = _personLabelService.Get(personLabelId);
            return Ok(res);
        }
    }
}
