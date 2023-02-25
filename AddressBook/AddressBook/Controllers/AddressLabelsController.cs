using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressLabelsController : ControllerBase
    {
        private readonly IAddressLabelService _addressLabelService;

        public AddressLabelsController(IAddressLabelService addressLabelService)
        {
            _addressLabelService = addressLabelService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] AddressLabelReqSearch dto)
        {
            var res = _addressLabelService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new AddressLabelReqSearch());
        }

        [HttpGet("{addressLabelId}")]
        public IActionResult Get(int addressLabelId)
        {
            var res = _addressLabelService.Get(addressLabelId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _addressLabelService.Count();
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(AddressLabelReqEdit dto)
        {
            var res = _addressLabelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{addressLabelId}")]
        public IActionResult Update(int addressLabelId, AddressLabelReqEdit dto)
        {
            var res = _addressLabelService.Update(addressLabelId, dto);
            return Ok(res);
        }

        [HttpDelete("{addressLabelId}")]
        public IActionResult Delete(int addressLabelId)
        {
            _addressLabelService.Delete(addressLabelId);
            return NoContent();
        }
    }
}
