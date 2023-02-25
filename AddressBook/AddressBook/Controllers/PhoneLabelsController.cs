using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneLabelsController : ControllerBase
    {
        private readonly IPhoneLabelService _phoneLabelService;

        public PhoneLabelsController(IPhoneLabelService phoneLabelService)
        {
            _phoneLabelService = phoneLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PhoneLabelReqSearch dto)
        {
            var res = _phoneLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PhoneLabelReqSearch());
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _phoneLabelService.Count();
            return Ok(res);
        }

        [HttpGet("{phoneLabelId}")]
        public IActionResult Get(int phoneLabelId)
        {
            var res = _phoneLabelService.Get(phoneLabelId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(PhoneLabelReqEdit dto)
        {
            var res = _phoneLabelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{phoneLabelId}")]
        public IActionResult Update(int phoneLabelId, PhoneLabelReqEdit dto)
        {
            var res = _phoneLabelService.Update(phoneLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{phoneLabelId}")]
        public IActionResult Delete(int phoneLabelId)
        {
            _phoneLabelService.Delete(phoneLabelId);
            return NoContent();
        }
    }
}
