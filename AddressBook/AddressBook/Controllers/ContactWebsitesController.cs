using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactWebsitesController : ControllerBase
    {
        private readonly IContactWebsiteService _contactWebsiteService;

        public ContactWebsitesController(IContactWebsiteService contactWebsiteService)
        {
            _contactWebsiteService = contactWebsiteService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactWebsiteReqSearch dto)
        {
            var res = _contactWebsiteService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactWebsiteReqSearch());
        }

        [HttpGet("contactWebsiteId")]
        public IActionResult Get(int contactWebsiteId)
        {
            var res = _contactWebsiteService.Get(contactWebsiteId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactWebsiteReqEdit dto)
        {
            var res = _contactWebsiteService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactWebsiteId}")]
        public IActionResult Update(int contactWebsiteId, ContactWebsiteReqEdit dto)
        {
            var res = _contactWebsiteService.Update(contactWebsiteId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactWebsiteId}")]
        public IActionResult Delete(int contactWebsiteId)
        {
            _contactWebsiteService.Delete(contactWebsiteId);
            return NoContent();
        }
    }
}
