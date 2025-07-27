# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy solution and project files
COPY API-Vorlage/API.sln ./API.sln
COPY API-Vorlage/API.csproj ./API-Vorlage/
COPY API-Vorlage/API.csproj.user ./API-Vorlage/
COPY API-Vorlage/API.xml ./API-Vorlage/
COPY API-Vorlage/appsettings*.json ./API-Vorlage/

# Copy source folders
COPY API-Vorlage/API-Vorlage ./API-Vorlage/API-Vorlage
COPY API-Vorlage/Controllers ./API-Vorlage/Controllers
COPY API-Vorlage/DataObject ./API-Vorlage/DataObject
COPY API-Vorlage/Properties ./API-Vorlage/Properties
COPY API-Vorlage/Store ./API-Vorlage/Store

RUN dotnet restore ./API.sln

# Copy everything else and build
COPY API-Vorlage/. ./API-Vorlage/
RUN dotnet publish ./API-Vorlage/API.csproj -c Release -o /app/out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "API.dll"]
