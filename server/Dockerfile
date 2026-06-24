# #server

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY server.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app/out ./

ENV ASPNETCORE_URLS=http://0.0.0.0:5044
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5044

ENTRYPOINT ["dotnet", "server.dll"]