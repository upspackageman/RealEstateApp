# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy only the necessary files for restoring dependencies
COPY *.sln .
RUN dotnet restore

# Copy the entire project and build it
COPY . .
RUN dotnet build -c Release --no-restore -o out

# Publish stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS publish
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/out ./

# Run migrations on startup
CMD ["dotnet", "API.dll", "migrate"]