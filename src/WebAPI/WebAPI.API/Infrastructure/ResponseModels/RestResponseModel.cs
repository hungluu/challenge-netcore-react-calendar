namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class RestResponseModel<T> where T : class
    {
        public T data { get; set; }
        public int code { get; set; }

        public RestResponseModel()
        {
            code = 200;
        }
    }
}
