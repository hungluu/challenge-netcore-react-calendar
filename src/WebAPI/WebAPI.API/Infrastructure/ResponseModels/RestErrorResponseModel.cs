using System.Collections.Generic;

namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class RestErrorResponseModel
    {
        public int code { get; set; }
        public string message { get; set; }
        public List<RestErrorModel> errors { get; set; }

        public RestErrorResponseModel()
        {
            code = 500;
            errors = new List<RestErrorModel>();
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
