using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonEmailsController : ControllerBase
    {
        private readonly IPersonEmailService _personEmailService;

        public PersonEmailsController(IPersonEmailService personEmailService)
        {
            _personEmailService = personEmailService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonEmailReqSearch dto)
        {
            var res = _personEmailService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonEmailReqSearch());
        }

        [HttpPost]
        public IActionResult Create(PersonEmailReqEdit dto)
        {
            var res = _personEmailService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{personEmailId}")]
        public IActionResult Update(int personEmailId, PersonEmailReqEdit dto)
        {
            var res = _personEmailService.Update(personEmailId, dto);
            return Ok(res);
        }

        [HttpDelete("{personEmailId}")]
        public IActionResult Delete(int personEmailId)
        {
            _personEmailService.Delete(personEmailId);
            return NoContent();
        }

        [HttpGet("{personEmailId}")]
        public IActionResult Get(int personEmailId)
        {
            var res = _personEmailService.Get(personEmailId);
            return Ok(res);
        }
    }
}
