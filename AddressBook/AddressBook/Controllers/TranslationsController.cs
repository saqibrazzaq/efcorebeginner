using AddressBook.Dtos;
using AddressBook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly ITranslationService _translationService;

        public TranslationsController(ITranslationService translationService)
        {
            _translationService = translationService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            return Search(new TranslationReqSearch());
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] TranslationReqSearch dto)
        {
            var res = _translationService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{translationId}")]
        public IActionResult Get(int translationId)
        {
            var res = _translationService.Get(translationId);
            return Ok(res);
        }

        [HttpPost]
        public IActionResult Create(TranslationReqEdit dto)
        {
            var res = _translationService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{translationId}")]
        public IActionResult Update(int translationId, TranslationReqEdit dto)
        {
            var res = _translationService.Update(translationId, dto);
            return Ok(res);
        }

        [HttpDelete("{translationId}")]
        public IActionResult Delete(int translationId)
        {
            _translationService.Delete(translationId);
            return NoContent();
        }
    }
}
