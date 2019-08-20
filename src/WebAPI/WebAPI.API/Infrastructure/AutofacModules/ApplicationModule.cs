using Autofac;
using System.Reflection;
using WebAPI.API.Application.Commands;
using WebAPI.API.Application.Queries;
using WebAPI.Domain.Aggregates.ShopAggregate;
using WebAPI.Infrastructure.Idempotency;
using WebAPI.Infrastructure.Repositories;

namespace WebAPI.API.Infrastructure.AutofacModules
{
    public class ApplicationModule: Autofac.Module
    {

        public string QueriesConnectionString { get; }

        public ApplicationModule(string qconstr)
        {
            QueriesConnectionString = qconstr;
        }

        protected override void Load(ContainerBuilder builder)
        {

            builder.Register(c => new ShopQueries(QueriesConnectionString))
                .As<IShopQueries>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ShopRepository>()
                .As<IShopRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<RequestManager>()
               .As<IRequestManager>()
               .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(typeof(UpdateShiftSettingsCommandHandler).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(IIntegrationEventHandler<>));
        }
    }
}
