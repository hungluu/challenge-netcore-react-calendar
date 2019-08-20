using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.API.Infrastructure.ActionResults
{
    public class RestResult : IActionResult
    {
        public object Data { get; set; }
        public int Code { get; set; }
        public object Meta { get; set; }
        public object Links { get; set; }

        public RestResult()
        {
            Code = StatusCodes.Status200OK;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(new
            {
                Data,
                Code,
                Meta,
                Links
            });

            objectResult.StatusCode = Code;

            await objectResult.ExecuteResultAsync(context);
        }
    }
}
