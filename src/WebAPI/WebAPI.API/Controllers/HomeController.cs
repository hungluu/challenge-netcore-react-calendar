using Microsoft.AspNetCore.Mvc;
using System;

namespace WebAPI.API.Controllers
{
    public class HomeController: Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                return new RedirectResult("~/swagger");
            }
            else
            {
                return new RedirectResult("~/api/swagger");
            }
        }
    }
}
