using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactAddressesController : ControllerBase
    {
        private readonly IContactAddressService _contactAddressService;

        public ContactAddressesController(IContactAddressService contactAddressService)
        {
            _contactAddressService = contactAddressService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactAddressReqSearch dto)
        {
            var res = _contactAddressService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactAddressReqSearch());
        }

        [HttpGet("{contactAddressId}")]
        public IActionResult Get(int contactAddressId)
        {
            var res = _contactAddressService.Get(contactAddressId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactAddressReqEdit dto)
        {
            var res = _contactAddressService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactAddressId}")]
        public IActionResult Update(int contactAddressId, ContactAddressReqEdit dto)
        {
            var res = _contactAddressService.Update(contactAddressId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactAddressId}")]
        public IActionResult Delete(int contactAddressId)
        {
            _contactAddressService.Delete(contactAddressId);
            return NoContent();
        }
    }
}
