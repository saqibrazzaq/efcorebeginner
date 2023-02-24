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

        [HttpDelete("all")]
        public IActionResult ResetAllData()
        {
            _dataResetService.ResetAllData();
            return NoContent();
        }
    }
}
