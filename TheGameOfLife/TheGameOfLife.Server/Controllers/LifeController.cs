using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
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
        public IActionResult NextSeveralGenerations([FromBody]bool[][] lifeMap, int gens) 
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var generations = lifeService.ProceedMany(lifeMap, gens);
            stopwatch.Stop();
            Console.WriteLine("elapsed: " + stopwatch.ElapsedMilliseconds);
            return Ok(generations);
        }
    }
}
