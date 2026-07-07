# #server
# # Use official .NET SDK image for build
# FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
# WORKDIR /app

# # Copy csproj and restore as distinct layers
# COPY server.csproj ./
# RUN dotnet restore

# # Copy everything and build
# COPY . ./
# RUN dotnet publish -c Release -o out

# # Runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:10.0
# WORKDIR /app
# COPY --from=build /app/out .

# # Expose port
# EXPOSE 5000
# ENTRYPOINT ["dotnet", "server.dll"]

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
ENV ASPNETCORE_ENVIRONMENT=PRODUCTION

EXPOSE 5044

ENTRYPOINT ["dotnet", "server.dll"]