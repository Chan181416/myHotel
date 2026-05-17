
// // using Microsoft.OpenApi.Models;
// using server.model;
// using server.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<MyHotelDbContext>(options =>options.UseSqlServer(
//     builder.Configuration.GetConnectionString("MyHotelDbContext")));

// // חובה להוסיף Controllers
// builder.Services.AddControllers();

// // Swagger
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();

// // חשוב גם זה בדרך כלל בפרויקטים אמיתיים
// app.MapControllers();

// // Minimal API (זה בסדר להשאיר)
// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild",
//     "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast = Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();

//     return forecast;
// })
// .WithName("GetWeatherForecast");
// app.MapGet("/", () => "MyHotel API is running");
// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
using server.model;
using server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<MyHotelDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyHotelDbContext")));

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS Redirect
app.UseHttpsRedirection();

// Authorization
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// Root endpoint
app.MapGet("/", () => "MyHotel API is running");

// Minimal API: weatherforecast
// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild",
//     "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast = Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();

//     return forecast;
// })
// .WithName("GetWeatherForecast");

app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }