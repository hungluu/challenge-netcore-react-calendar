FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["src/WebAPI/WebAPI.API/WebAPI.API.csproj", "src/WebAPI/WebAPI.API/"]
COPY ["src/WebAPI/WebAPI.Infrastructure/WebAPI.Infrastructure.csproj", "src/WebAPI/WebAPI.Infrastructure/"]
COPY ["src/WebAPI/WebAPI.Domain/WebAPI.Domain.csproj", "src/WebAPI/WebAPI.Domain/"]
RUN dotnet restore "src/WebAPI/WebAPI.API/WebAPI.API.csproj"
COPY . .
WORKDIR "/src/src/WebAPI/WebAPI.API"
RUN dotnet build "WebAPI.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "WebAPI.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WebAPI.API.dll"]
