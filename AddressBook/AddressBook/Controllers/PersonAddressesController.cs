using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonAddressesController : ControllerBase
    {
        private readonly IPersonAddressService _personAddressService;

        public PersonAddressesController(IPersonAddressService personAddressService)
        {
            _personAddressService = personAddressService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PersonAddressReqSearch dto)
        {
            var res = _personAddressService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new PersonAddressReqSearch());
        }

        [HttpGet("{personAddressId}")]
        public IActionResult Get(int personAddressId)
        {
            var res = _personAddressService.Get(personAddressId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(PersonAddressReqEdit dto)
        {
            var res = _personAddressService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{personAddressId}")]
        public IActionResult Update(int personAddressId, PersonAddressReqEdit dto)
        {
            var res = _personAddressService.Update(personAddressId, dto);
            return Ok(res);
        }

        [HttpDelete("{personAddressId}")]
        public IActionResult Delete(int personAddressId)
        {
            _personAddressService.Delete(personAddressId);
            return NoContent();
        }
    }
}
