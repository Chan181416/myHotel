using Xunit;
using Microsoft.EntityFrameworkCore;
using server.Controllers;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
public class CheckTablesControllerTests
{
    private MyHotelDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<MyHotelDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new MyHotelDbContext(options);
    }

    private CheckTablesController GetController(MyHotelDbContext context)
    {
        return new CheckTablesController(context);
    }

    // 1. כל הטבלאות מלאות -> true
    [Fact]
    public async Task AllTablesHaveData_ReturnsTrue_WhenAllTablesHaveData()
    {
        var context = GetDbContext();

        context.Conditions.Add(new Condition());
        context.PricesLists.Add(new PricesList());
        context.RoomsDBs.Add(new RoomsDB());
        context.Roles.Add(new Role());

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.True(value);
    }

    // 2. טבלה אחת ריקה -> false
    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenOneTableIsEmpty()
    {
        var context = GetDbContext();

        context.Conditions.Add(new Condition());
        context.PricesLists.Add(new PricesList());
        context.RoomsDBs.Add(new RoomsDB());
        // Roles ריק

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }

    // 3. כל הטבלאות ריקות -> false
    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenAllTablesAreEmpty()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }
}