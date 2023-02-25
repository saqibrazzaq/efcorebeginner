using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailLabelsController : ControllerBase
    {
        private readonly IEmailLabelService _emailLabelService;

        public EmailLabelsController(IEmailLabelService emailLabelService)
        {
            _emailLabelService = emailLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] EmailLabelReqSearch dto)
        {
            var res = _emailLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _emailLabelService.Count();
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new EmailLabelReqSearch());
        }

        [HttpPost]
        public IActionResult Create(EmailLabelReqEdit dto)
        {
            var res = _emailLabelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{emailLabelId}")]
        public IActionResult Update(int emailLabelId, EmailLabelReqEdit dto)
        {
            var res = _emailLabelService.Update(emailLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{emailLabelId}")]
        public IActionResult Delete(int emailLabelId)
        {
            _emailLabelService.Delete(emailLabelId);
            return NoContent();
        }

        [HttpGet("{emailLabelId}")]
        public IActionResult Get(int emailLabelId)
        {
            var res = _emailLabelService.Get(emailLabelId);
            return Ok(res);
        }
    }
}
