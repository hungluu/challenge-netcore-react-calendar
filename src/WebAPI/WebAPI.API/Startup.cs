using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.API.Infrastructure.AutofacModules;
using Swashbuckle.AspNetCore.Swagger;
using WebAPI.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WebAPI.API.Infrastructure.Filters;
using Microsoft.AspNetCore.HttpOverrides;

namespace WebAPI.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddCustomMvc()
                .AddCustomDbContext(Configuration)
                .AddCustomSwagger();

            var container = new ContainerBuilder();
            container.Populate(services);

            string connectionString;
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                connectionString = Configuration["ConnectionString"];
            }
            else
            {
                var dbServerName = Environment.GetEnvironmentVariable("MSSQL_SERVER_NAME");
                var dbPassword = Environment.GetEnvironmentVariable("SA_PASSWORD");
                var dbUser = Environment.GetEnvironmentVariable("SA_USER");
                var dbName = Environment.GetEnvironmentVariable("MSSQL_DB_NAME");
                connectionString = $@"Data Source={dbServerName};Initial Catalog={dbName};User ID={dbUser};Password={dbPassword};";
            }

            container.RegisterModule(new ApplicationModule(connectionString));
            container.RegisterModule(new MediatorModule());

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var configBasePath = Configuration["PATH_BASE"];
            var basePath = !string.IsNullOrEmpty(configBasePath) ? configBasePath : string.Empty;
            var swaggerBasePath = $"{basePath}/swagger/v1/";
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                basePath = $"/{basePath}api/";
                swaggerBasePath = $"{basePath}swagger/v1/";
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            ConfigureAuth(app, env);

            app.UseMvcWithDefaultRoute();

            app.UseSwagger(c =>
                {
                    c.PreSerializeFilters.Add((swaggerDoc, httpReq) => swaggerDoc.BasePath = basePath);
                })
               .UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint($"{swaggerBasePath}swagger.json", "Elite.WebAPI V1");
                   c.OAuthClientId("elitewenapiswaggerui");
                   c.OAuthAppName("Elite.WebAPI Swagger UI");
               });
        }

        protected virtual void ConfigureAuth(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(CustomExtensionsMethods.MyAllowSpecificOrigins);
            }
            app.UseAuthentication();
        }
    }

    static class CustomExtensionsMethods
    {
        public static readonly string MyAllowSpecificOrigins = "CorsPolicy";

        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            // Add framework services.
            services.AddCors(options =>
                {
                    options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
                })
                .AddMvc(options =>
                {
                    options.Filters.Add(typeof(HttpExceptionFilter));
                    options.Filters.Add(typeof(HttpActionFilter));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                })
                .AddControllersAsServices();  //Injecting Controllers themselves thru DI
                                              //For further info see: http://docs.autofac.org/en/latest/integration/aspnetcore.html#controllers-as-services

            return services;
        }

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services) //, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
            {
                options.DescribeAllEnumsAsStrings();
                options.SwaggerDoc("v1", new Info
                {
                    Title = "Elite HTTP API",
                    Version = "v1",
                    Description = "The Elite HTTP API",
                    TermsOfService = "Terms Of Service"
                });
            });

            return services;
        }

        public static IServiceCollection AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString;
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                connectionString = configuration["ConnectionString"];
            }
            else
            {
                var dbServerName = Environment.GetEnvironmentVariable("MSSQL_SERVER_NAME");
                var dbPassword = Environment.GetEnvironmentVariable("SA_PASSWORD");
                var dbUser = Environment.GetEnvironmentVariable("SA_USER");
                var dbName = Environment.GetEnvironmentVariable("MSSQL_DB_NAME");
                connectionString = $@"Data Source={dbServerName};Initial Catalog={dbName};User ID={dbUser};Password={dbPassword};";
            }

            services.AddEntityFrameworkSqlServer()
                   .AddDbContext<WebApiContext>(options =>
                   {
                       options.UseSqlServer(connectionString,
                           sqlServerOptionsAction: sqlOptions =>
                           {
                               sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                               sqlOptions.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                           });
                   },
                       ServiceLifetime.Scoped  //Showing explicitly that the DbContext is shared across the HTTP request scope (graph of objects started in the HTTP request)
                   );

            return services;
        }

        public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            services.Configure<WebApiSettings>(configuration);
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Instance = context.HttpContext.Request.Path,
                        Status = StatusCodes.Status400BadRequest,
                        Detail = "Please refer to the errors property for additional details."
                    };

                    return new BadRequestObjectResult(problemDetails)
                    {
                        ContentTypes = { "application/problem+json", "application/problem+xml" }
                    };
                };
            });

            return services;
        }
    }
}
