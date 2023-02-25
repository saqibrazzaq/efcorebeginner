using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactLabelsController : ControllerBase
    {
        private readonly IContactLabelService _contactLabelService;

        public ContactLabelsController(IContactLabelService contactLabelService)
        {
            _contactLabelService = contactLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactLabelReqSearch dto)
        {
            var res = _contactLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactLabelReqSearch());
        }

        [HttpGet("anyContact/{labelId}")]
        public IActionResult AnyContact(int labelId)
        {
            var res = _contactLabelService.AnyContact(labelId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _contactLabelService.Count();
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactLabelReqEdit dto)
        {
            var res = _contactLabelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactLabelId}")]
        public IActionResult Update(int contactLabelId, ContactLabelReqEdit dto)
        {
            var res = _contactLabelService.Update(contactLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactLabelId}")]
        public IActionResult Delete(int contactLabelId)
        {
            _contactLabelService.Delete(contactLabelId);
            return NoContent();
        }

        [HttpGet("{contactLabelId}")]
        public IActionResult Get(int contactLabelId)
        {
            var res = _contactLabelService.Get(contactLabelId);
            return Ok(res);
        }
    }
}
