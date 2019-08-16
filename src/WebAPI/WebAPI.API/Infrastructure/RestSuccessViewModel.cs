namespace WebAPI.API.Infrastructure
{
    public class RestSuccessViewModel<T>
    {
        public T data { get; set; }
        public int code { get; set; }
        public object meta { get; set; }
        public object links { get; set; }

        public RestSuccessViewModel()
        {
            meta = new { };
            links = new { };
            code = 200;
        }
    }
}
