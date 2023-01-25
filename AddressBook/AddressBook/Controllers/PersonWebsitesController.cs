using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonWebsitesController : ControllerBase
    {
        private readonly IPersonWebsiteService _personWebsiteService;

        public PersonWebsitesController(IPersonWebsiteService personWebsiteService)
        {
            _personWebsiteService = personWebsiteService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonWebsiteReqSearch dto)
        {
            var res = _personWebsiteService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonWebsiteReqSearch());
        }

        [HttpGet("personWebsiteId")]
        public IActionResult Get(int personWebsiteId)
        {
            var res = _personWebsiteService.Get(personWebsiteId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(PersonWebsiteReqEdit dto)
        {
            var res = _personWebsiteService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{personWebsiteId}")]
        public IActionResult Update(int personWebsiteId, PersonWebsiteReqEdit dto)
        {
            var res = _personWebsiteService.Update(personWebsiteId, dto);
            return Ok(res);
        }

        [HttpDelete("{personWebsiteId}")]
        public IActionResult Delete(int personWebsiteId)
        {
            _personWebsiteService.Delete(personWebsiteId);
            return NoContent();
        }
    }
}
