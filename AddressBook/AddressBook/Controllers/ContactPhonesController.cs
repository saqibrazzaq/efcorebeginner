using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactPhonesController : ControllerBase
    {
        private readonly IContactPhoneService _contactPhoneService;

        public ContactPhonesController(IContactPhoneService contactPhoneService)
        {
            _contactPhoneService = contactPhoneService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactPhoneReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactPhoneReqSearch dto)
        {
            var res = _contactPhoneService.Search(dto);
            return Ok(res);
        }

        [HttpGet("anyPhone/{phoneLabelId}")]
        public IActionResult AnyPhone(int phoneLabelId)
        {
            var res = _contactPhoneService.AnyPhone(phoneLabelId);
            return Ok(res);
        }

        [HttpGet("{contactPhoneId}")]
        public IActionResult Get(int contactPhoneId)
        {
            var res = _contactPhoneService.Get(contactPhoneId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ContactPhoneReqEdit dto)
        {
            var res = _contactPhoneService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactPhoneId}")]
        public IActionResult Update(int contactPhoneId, [FromBody] ContactPhoneReqEdit dto)
        {
            var res = _contactPhoneService.Update(contactPhoneId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactPhoneId}")]
        public IActionResult Delete(int contactPhoneId)
        {
            _contactPhoneService.Delete(contactPhoneId);
            return NoContent();
        }
    }
}
