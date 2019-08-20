using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.API.Infrastructure.ActionResults
{
    public class RestErrorResult : IActionResult
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public List<RestErrorModel> Errors { get; set; }

        public RestErrorResult()
        {
            Code = StatusCodes.Status500InternalServerError;
            Errors = new List<RestErrorModel>();
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(new {
                Code,
                Message,
                Errors
            });

            objectResult.StatusCode = Code;

            await objectResult.ExecuteResultAsync(context);
        }
    }

    public class RestErrorModel
    {
        public string message { get; set; }
        public string location { get; set; }
        public string locationType { get; set; }

        public RestErrorModel()
        {
            locationType = "field";
        }
    }
}
