using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Polly;
using Polly.Retry;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Domain.Aggregates.ShopAggregate;
using WebAPI.Infrastructure;

namespace WebAPI.API.Infrastructure
{
    public class WebApiContextSeed
    {
        public async Task SeedAsync(WebApiContext context, IHostingEnvironment env, IOptions<WebApiSettings> settings, ILogger<WebApiContextSeed> logger)
        {
            var policy = CreatePolicy(logger, nameof(WebApiContextSeed));

            await policy.ExecuteAsync(async () =>
            {

                var useCustomizationData = settings.Value.UseCustomizationData;

                var contentRootPath = env.ContentRootPath;


                using (context)
                {
                    context.Database.Migrate();

                    if (!context.Shops.Any() && !context.ShopLocations.Any())
                    {
                        var shop1 = new Shop("Vinmart");
                        shop1.AddLocation("Vinmart TQT");
                        shop1.AddLocation("Vinmart LD");

                        context.Shops.Add(shop1);

                        var shop2 = new Shop("Honda");
                        shop2.AddLocation("Honda DBP");
                        shop2.AddLocation("Honda HD");

                        context.Shops.Add(shop2);

                        await context.SaveChangesAsync();
                    }

                    await context.SaveChangesAsync();
                }
            });
        }

        private AsyncRetryPolicy CreatePolicy(ILogger<WebApiContextSeed> logger, string prefix, int retries = 3)
        {
            return Policy.Handle<SqlException>().
                WaitAndRetryAsync(
                    retryCount: retries,
                    sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                    onRetry: (exception, timeSpan, retry, ctx) =>
                    {
                        logger.LogWarning(exception, "[{prefix}] Exception {ExceptionType} with message {Message} detected on attempt {retry} of {retries}", prefix, exception.GetType().Name, exception.Message, retry, retries);
                    }
                );
        }
    }
}
