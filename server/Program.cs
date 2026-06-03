using server.Data;
using server.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<MyHotelDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyHotelDbContext")));

// Controllers
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

// Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Swagger רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Music API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

// CORS חייב להיות לפני Authorization
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MyHotelDbContext>();

    if (!context.Roles.Any())
    {
        context.Roles.Add(new Role
        {
            Id = Guid.NewGuid(),
            Name = "דוד",
            IdNumber = 123456,
            Code = 2
        });

        context.SaveChanges();
    }
}

app.Run();