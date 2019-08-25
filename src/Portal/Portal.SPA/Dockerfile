FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["src/Portal/Portal.SPA/Portal.SPA.csproj", "src/Portal/Portal.SPA/"]
RUN dotnet restore "src/Portal/Portal.SPA/Portal.SPA.csproj"
COPY . .
WORKDIR "/src/src/Portal/Portal.SPA"
RUN dotnet build "Portal.SPA.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Portal.SPA.csproj" -c Release -o /app

FROM base AS final
RUN apt-get -qq update && apt-get -qqy --no-install-recommends install wget gnupg \
    git \
    unzip
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Portal.SPA.dll"]
