using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonChatsController : ControllerBase
    {
        private readonly IPersonChatService _personChatService;

        public PersonChatsController(IPersonChatService personChatService)
        {
            _personChatService = personChatService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonChatReqSearch dto)
        {
            var res = _personChatService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonChatReqSearch());
        }

        [HttpPost]
        public IActionResult Create(PersonChatReqEdit dto)
        {
            var res = _personChatService.Create(dto);
            return Ok(res);
        }

        [HttpGet("{personChatId}")]
        public IActionResult Get(int personChatId)
        {
            var res = _personChatService.Get(personChatId);
            return Ok(res);
        }

        [HttpPut("{personChatId}")]
        public IActionResult Update(int personChatId, PersonChatReqEdit dto)
        {
            var res = _personChatService.Update(personChatId, dto);
            return Ok(res);
        }

        [HttpDelete("{personChatId}")]
        public IActionResult Delete(int personChatId)
        {
            _personChatService.Delete(personChatId);
            return NoContent();
        }
    }
}
