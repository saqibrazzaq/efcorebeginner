using AddressBook.Common;
using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly IWebHostEnvironment _environment;
        public ContactsController(IContactService contactService, 
            IWebHostEnvironment environment)
        {
            _contactService = contactService;
            _environment = environment;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new ContactReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ContactReqSearch dto)
        {
            var res = _contactService.Search(dto);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(ContactReqEdit dto)
        {
            var res = _contactService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{contactId}")]
        public IActionResult Update(int contactId, ContactReqEdit dto)
        {
            var res = _contactService.Update(contactId, dto);
            return Ok(res);
        }

        [HttpGet("{contactId}")]
        public IActionResult Get(int contactId)
        {
            var res = _contactService.Get(contactId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _contactService.Count();
            return Ok(res);
        }

        [HttpGet("addressCount/{cityId}")]
        public IActionResult CountByCity(int cityId)
        {
            var res = _contactService.Count(cityId);
            return Ok(res);
        }

        [HttpDelete("{contactId}")]
        public IActionResult Delete(int contactId)
        {
            _contactService.Delete(contactId);
            return NoContent();
        }

        [HttpPost("{contactId}")]
        public IActionResult UpdateImage(int contactId)
        {
            var res = _contactService.UpdateImage(contactId, Request.Form.Files[0], TempFolderPath);
            Console.WriteLine("temp folder path: " + TempFolderPath);
            return Ok(res);
        }

        public string TempFolderPath
        {
            get
            {
                return Path.Combine(_environment.ContentRootPath, Constants.TempFolderName);
            }
        }
    }
}
