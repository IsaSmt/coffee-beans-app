# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.sln ./
COPY API.csproj ./
COPY API.csproj.user ./
COPY API.xml ./
COPY appsettings*.json ./
COPY ./API-Vorlage ./API-Vorlage
COPY ./Controllers ./Controllers
COPY ./DataObject ./DataObject
COPY ./Properties ./Properties
COPY ./Store ./Store
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "API.dll"]
