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

        public DataResetController(IDataResetService dataResetService)
        {
            _dataResetService = dataResetService;
        }

        [HttpDelete("delete-all")]
        public IActionResult DeleteAllData()
        {
            _dataResetService.DeleteAllData();
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
            _dataResetService.AddCountriesData();
            return NoContent();
        }
    }
}
