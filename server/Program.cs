using server.Data;
using server.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
Console.WriteLine("CONFIG VIEW:");
Console.WriteLine(builder.Configuration.GetDebugView());

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

Console.WriteLine(connectionString);

if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("DefaultConnection is missing in appsettings.json");
}

builder.Services.AddDbContext<MyHotelDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Music API V1");
        c.RoutePrefix = string.Empty;
    });
}
//app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/", () => "Server is running");
app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MyHotelDbContext>();
    try
    {
        context.Database.Migrate();
        if (!context.Roles.Any())
        {
            context.Roles.Add(new Role
            {
                Id = Guid.NewGuid(),
                Name = "דוד",
                IdNumber = 123456789,
                Code = 2
            });

            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("DB INIT ERROR: " + ex.Message);

    }

}
app.Run();