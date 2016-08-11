using Microsoft.AspNet.Mvc;

namespace TemplatingEngine.Controllers
{
	public class BlanketController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

	}
}