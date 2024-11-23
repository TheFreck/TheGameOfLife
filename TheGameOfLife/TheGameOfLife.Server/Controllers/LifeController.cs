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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("you made it here!");
        }

        [HttpPost]
        public IActionResult NextGen(bool[][] lifeMap) 
        {
            return Ok(lifeService.Proceed(lifeMap));
        }
    }
}
