using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactReqSearch dto)
        {
            var res = _contactService.Search(dto);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactReqEdit dto)
        {
            var res = _contactService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactId}")]
        public IActionResult Update(int contactId, ContactReqEdit dto)
        {
            var res = _contactService.Update(contactId, dto);
            return Ok(res);
        }

        [HttpGet("{contactId}")]
        public IActionResult Get(int contactId)
        {
            var res = _contactService.Get(contactId);
            return Ok(res);
        }

        [HttpDelete("{contactId}")]
        public IActionResult Delete(int contactId)
        {
            _contactService.Delete(contactId);
            return NoContent();
        }
    }
}
