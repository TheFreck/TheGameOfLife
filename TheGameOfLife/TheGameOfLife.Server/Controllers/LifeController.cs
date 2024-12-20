using Microsoft.AspNetCore.Mvc;
using TheGameOfLife.Server.Services;

namespace TheGameOfLife.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LifeController : ControllerBase
    {

        private readonly ILogger<LifeController> _logger;
        private readonly ILifeService lifeService;

        public LifeController(ILifeService lifeService, ILogger<LifeController> logger)
        {
            _logger = logger;
            this.lifeService = lifeService;
        }

        [HttpPost]
        public IActionResult NextGen(bool[][] lifeMap) 
        {
            return Ok(lifeService.Proceed(lifeMap));
        }

        [HttpPost("{gens}")]
        public IActionResult NextSeveralGenerations(bool[][] lifeMap, int gens) 
        {
            return Ok(lifeService.ProceedMany(lifeMap, gens));
        }
    }
}
