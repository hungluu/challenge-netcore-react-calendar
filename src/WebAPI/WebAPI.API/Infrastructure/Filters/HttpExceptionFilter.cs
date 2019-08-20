using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using WebAPI.API.Infrastructure.ActionResults;

namespace WebAPI.API.Infrastructure.Filters
{
    public class HttpExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var result = new RestErrorResult()
            {
                Message = context.Exception.Message
            };

            context.Result = result;

            context.HttpContext.Response.StatusCode = (int)result.Code;

            context.ExceptionHandled = true;
        }
    }
}
