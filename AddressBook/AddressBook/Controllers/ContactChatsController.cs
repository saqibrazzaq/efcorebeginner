using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactChatsController : ControllerBase
    {
        private readonly IContactChatService _contactChatService;

        public ContactChatsController(IContactChatService contactChatService)
        {
            _contactChatService = contactChatService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactChatReqSearch dto)
        {
            var res = _contactChatService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactChatReqSearch());
        }

        [HttpGet("anyChats/{chatLabelId}")]
        public IActionResult AnyChats(int chatLabelId)
        {
            var res = _contactChatService.AnyChats(chatLabelId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _contactChatService.Count();
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactChatReqEdit dto)
        {
            var res = _contactChatService.Create(dto);
            return Ok(res);
        }

        [HttpGet("{contactChatId}")]
        public IActionResult Get(int contactChatId)
        {
            var res = _contactChatService.Get(contactChatId);
            return Ok(res);
        }

        [HttpPut("{contactChatId}")]
        public IActionResult Update(int contactChatId, ContactChatReqEdit dto)
        {
            var res = _contactChatService.Update(contactChatId, dto);
            return Ok(res);
        }

        [HttpDelete("{contactChatId}")]
        public IActionResult Delete(int contactChatId)
        {
            _contactChatService.Delete(contactChatId);
            return NoContent();
        }
    }
}
