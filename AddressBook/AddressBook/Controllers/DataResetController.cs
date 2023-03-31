using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataResetController : ControllerBase
    {
        private readonly IDataResetService _dataResetService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public DataResetController(IDataResetService dataResetService, 
            IWebHostEnvironment webHostEnvironment)
        {
            _dataResetService = dataResetService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpDelete("delete-countries")]
        public IActionResult DeleteCountries()
        {
            _dataResetService.DeleteCountries();
            return NoContent();
        }

        [HttpDelete("delete-labels")]
        public IActionResult DeleteLabels()
        {
            _dataResetService.DeleteLabels();
            return NoContent();
        }

        [HttpDelete("delete-contacts")]
        public IActionResult DeleteContacts()
        {
            _dataResetService.DeleteContacts();
            return NoContent();
        }

        [HttpDelete("delete-contact-labels")]
        public IActionResult DeleteContactLabels()
        {
            _dataResetService.DeleteContactLabels();
            return NoContent();
        }

        [HttpDelete("delete-contact-emails")]
        public IActionResult DeleteContactEmails()
        {
            _dataResetService.DeleteContactEmails();
            return NoContent();
        }

        [HttpDelete("delete-contact-phones")]
        public IActionResult DeleteContactPhones()
        {
            _dataResetService.DeleteContactPhones();
            return NoContent();
        }

        [HttpDelete("delete-contact-addresses")]
        public IActionResult DeleteContactAddresses()
        {
            _dataResetService.DeleteContactAddresses();
            return NoContent();
        }

        [HttpDelete("delete-contact-websites")]
        public IActionResult DeleteContactWebsites()
        {
            _dataResetService.DeleteContactWebsites();
            return NoContent();
        }

        [HttpDelete("delete-contact-chats")]
        public IActionResult DeleteContactChats()
        {
            _dataResetService.DeleteContactChats();
            return NoContent();
        }

        [HttpPost("add-contacts")]
        public IActionResult AddContacts()
        {
            _dataResetService.AddContactsData();
            return NoContent();
        }

        [HttpPost("add-countries")]
        public IActionResult AddCountries()
        {
            _dataResetService.AddCountriesData(_webHostEnvironment.ContentRootPath);
            return NoContent();
        }
    }
}
