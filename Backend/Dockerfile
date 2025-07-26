# Dockerfile für dein Projekt: DIGITAL_ENTREPRENEURSHIP/Backend/Dockerfile

# Stage 1: Build-Umgebung
# Wir nehmen .NET 8 als Basis. Ändere die Version (z.B. auf 6.0), falls du eine ältere verwendest.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopiere zuerst die Projekt- und Solution-Dateien.
# Dies nutzt den Docker-Cache optimal, sodass Dependencies nicht bei jeder Code-Änderung neu geladen werden.
# Die Pfade sind relativ zum "Backend"-Ordner, da wir Render später sagen, dies als Root zu verwenden.
COPY ["API.sln", "."]
COPY ["API-Vorlage/API.csproj", "API-Vorlage/"]
RUN dotnet restore "./API.sln"

# Kopiere den gesamten restlichen Code des Backends
COPY . .
WORKDIR "/src/API-Vorlage"

# Veröffentliche die Anwendung für die Produktion
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# ---

# Stage 2: Finale Runtime-Umgebung
# Nutzt die schlanke ASP.NET Runtime für ein kleines, sicheres Image.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Der Startpunkt deines Containers. Docker führt diesen Befehl aus, um deine API zu starten.
# Der Name der DLL entspricht meist dem Projektnamen (API.csproj -> API.dll)
# Der Name der DLL muss mit deinem .csproj-Dateinamen übereinstimmen (API-Vorlage.csproj -> API-Vorlage.dll)
ENTRYPOINT ["dotnet", "API-Vorlage.dll"] 