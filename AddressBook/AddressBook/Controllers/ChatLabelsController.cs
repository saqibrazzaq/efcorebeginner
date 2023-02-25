using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatLabelsController : ControllerBase
    {
        private readonly IChatLabelService _chatLabelService;

        public ChatLabelsController(IChatLabelService chatLabelService)
        {
            _chatLabelService = chatLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ChatLabelReqSearch dto)
        {
            var res = _chatLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ChatLabelReqSearch());
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _chatLabelService.Count();
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ChatLabelReqEdit dto)
        {
            var res = _chatLabelService.Create(dto);
            return Ok(res);
        }

        [HttpGet("{chatLabelId}")]
        public IActionResult Get(int chatLabelId)
        {
            var res = _chatLabelService.Get(chatLabelId);
            return Ok(res);
        }

        [HttpPut("{chatLabelId}")]
        public IActionResult Update(int chatLabelId, ChatLabelReqEdit dto)
        {
            var res = _chatLabelService.Update(chatLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{chatLabelId}")]
        public IActionResult Delete(int chatLabelId)
        {
            _chatLabelService.Delete(chatLabelId);
            return NoContent();
        }
    }
}
