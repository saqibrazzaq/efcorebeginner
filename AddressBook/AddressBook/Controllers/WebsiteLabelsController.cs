using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteLabelsController : ControllerBase
    {
        private readonly IWebsiteLabelService _websiteLabelService;

        public WebsiteLabelsController(IWebsiteLabelService websiteLabelService)
        {
            _websiteLabelService = websiteLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] WebsiteLabelReqSearch dto)
        {
            var res = _websiteLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _websiteLabelService.Count();
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new WebsiteLabelReqSearch());
        }

        [HttpPost]
        public IActionResult Create(WebsiteLabelReqEdit dto)
        {
            var res = _websiteLabelService.Create(dto);
            return Ok(res);
        }

        [HttpGet("{websiteLabelId}")]
        public IActionResult Get(int websiteLabelId)
        {
            var res = _websiteLabelService.Get(websiteLabelId);
            return Ok(res);
        }

        [HttpPut("{websiteLabelId}")]
        public IActionResult Update(int websiteLabelId, WebsiteLabelReqEdit dto)
        {
            var res = _websiteLabelService.Update(websiteLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{websiteLabelId}")]
        public IActionResult Delete(int websiteLabelId)
        {
            _websiteLabelService.Delete(websiteLabelId);
            return NoContent();
        }
    }
}
