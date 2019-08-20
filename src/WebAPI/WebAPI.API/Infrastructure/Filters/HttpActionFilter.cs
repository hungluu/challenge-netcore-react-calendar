using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.API.Infrastructure.ActionResults;

namespace WebAPI.API.Infrastructure.Filters
{
    public class HttpActionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Result.GetType() == typeof(ObjectResult)) {
                ObjectResult objectResult = (ObjectResult)context.Result;

                var result = new RestResult()
                {
                    Data = objectResult.Value
                };

                context.Result = result;
                context.HttpContext.Response.StatusCode = (int)result.Code;

                return;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Not implemented
        }
    }
}
