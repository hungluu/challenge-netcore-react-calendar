using Autofac;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Infrastructure.AutofacModules
{
    public class ApplicationModule: Module
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

            //builder.RegisterType<RequestManager>()
            //   .As<IRequestManager>()
            //   .InstancePerLifetimeScope();

            //builder.RegisterAssemblyTypes(typeof(CreateOrderCommandHandler).GetTypeInfo().Assembly)
            //    .AsClosedTypesOf(typeof(IIntegrationEventHandler<>));

        }
    }
}
