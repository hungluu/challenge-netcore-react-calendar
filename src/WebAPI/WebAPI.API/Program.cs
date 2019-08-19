using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IO;
using WebAPI.API.Infrastructure;
using WebAPI.Infrastructure;

namespace WebAPI.API
{
    public class Program
    {
        public static readonly string Namespace = typeof(Program).Namespace;
        public static readonly string AppName = Namespace.Substring(Namespace.LastIndexOf('.', Namespace.LastIndexOf('.') - 1) + 1);

        public static void Main(string[] args)
        {
            var configuration = GetConfiguration();

            var host = BuildWebHost(configuration, args);

            host.MigrateDbContext<WebApiContext>((context, services) =>
            {
                var env = services.GetService<IHostingEnvironment>();
                var settings = services.GetService<IOptions<WebApiSettings>>();
                var logger = services.GetService<ILogger<WebApiContextSeed>>();

                new WebApiContextSeed()
                    .SeedAsync(context, env, settings, logger)
                    .Wait();
            });

            host.Run();
        }

        public static IWebHost BuildWebHost(IConfiguration configuration, string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        private static IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
