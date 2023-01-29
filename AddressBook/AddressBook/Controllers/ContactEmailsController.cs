using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactEmailsController : ControllerBase
    {
        private readonly IContactEmailService _contactEmailService;

        public ContactEmailsController(IContactEmailService contactEmailService)
        {
            _contactEmailService = contactEmailService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactEmailReqSearch dto)
        {
            var res = _contactEmailService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactEmailReqSearch());
        }

        [HttpPost]
        public IActionResult Create(ContactEmailReqEdit dto)
        {
            var res = _contactEmailService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactEmailId}")]
        public IActionResult Update(int contactEmailId, ContactEmailReqEdit dto)
        {
            var res = _contactEmailService.Update(contactEmailId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactEmailId}")]
        public IActionResult Delete(int contactEmailId)
        {
            _contactEmailService.Delete(contactEmailId);
            return NoContent();
        }

        [HttpGet("{contactEmailId}")]
        public IActionResult Get(int contactEmailId)
        {
            var res = _contactEmailService.Get(contactEmailId);
            return Ok(res);
        }
    }
}
