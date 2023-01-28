using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        private readonly ILabelService _labelService;

        public LabelsController(ILabelService labelService)
        {
            _labelService = labelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] LabelReqSearch dto)
        {
            var res = _labelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new LabelReqSearch());
        }

        [HttpPost]
        public IActionResult Create(LabelReqEdit dto)
        {
            var res = _labelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{labelId}")]
        public IActionResult Update(int labelId, LabelReqEdit dto)
        {
            var res = _labelService.Update(labelId, dto);
            return Ok(res);
        }

        [HttpGet("{labelId}")]
        public IActionResult Get(int labelId)
        {
            var res = _labelService.Get(labelId);
            return Ok(res);
        }

        [HttpDelete("{labelId}")]
        public IActionResult Delete(int labelId)
        {
            _labelService.Delete(labelId);
            return NoContent();
        }
    }
}
