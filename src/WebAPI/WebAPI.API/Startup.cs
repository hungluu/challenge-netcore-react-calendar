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
                .AddCustomSwagger();

            var container = new ContainerBuilder();
            container.Populate(services);

            container.RegisterModule(new ApplicationModule(Configuration["ConnectionString"]));

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var pathBase = Configuration["PATH_BASE"];
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            //app.UseMvc();

            app.UseMvcWithDefaultRoute();

            app.UseSwagger()
               .UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint($"{ (!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty) }/swagger/v1/swagger.json", "Ordering.API V1");
                   c.OAuthClientId("orderingswaggerui");
                   c.OAuthAppName("Ordering Swagger UI");
               });
        }
    }

    static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc(options =>
            {
                //options.Filters.Add(typeof(HttpGlobalExceptionFilter));
            })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddControllersAsServices();  //Injecting Controllers themselves thru DI
                                              //For further info see: http://docs.autofac.org/en/latest/integration/aspnetcore.html#controllers-as-services

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("CorsPolicy",
            //        builder => builder
            //        .SetIsOriginAllowed((host) => true)
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        .AllowCredentials());
            //});

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

                //options.AddSecurityDefinition("oauth2", new OAuth2Scheme
                //{
                //    Type = "oauth2",
                //    Flow = "implicit",
                //    AuthorizationUrl = $"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/authorize",
                //    TokenUrl = $"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/token",
                //    Scopes = new Dictionary<string, string>()
                //    {
                //        { "orders", "Ordering API" }
                //    }
                //});

                //options.OperationFilter<AuthorizeCheckOperationFilter>();
            });

            return services;
        }
    }
}
