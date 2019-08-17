using System.Collections;

namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class RestListResponseModel<T> where T : ICollection
    {
        public T data { get; set; }
        public int code { get; set; }
        public object meta { get; set; }
        public object links { get; set; }

        public RestListResponseModel(T dataObject)
        {
            data = dataObject;
            meta = new {
                total = data.Count
            };
            links = new { };
            code = 200;
        }
    }
}
