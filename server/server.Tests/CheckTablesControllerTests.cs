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

    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenConditionsTableIsEmpty()
    {
        var context = GetDbContext();

        context.PricesLists.Add(new PricesList());
        context.RoomsDBs.Add(new RoomsDB());
        context.Roles.Add(new Role());

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }

    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenPricesListsTableIsEmpty()
    {
        var context = GetDbContext();

        context.Conditions.Add(new Condition());
        context.RoomsDBs.Add(new RoomsDB());
        context.Roles.Add(new Role());

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }

    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenRoomsDBsTableIsEmpty()
    {
        var context = GetDbContext();

        context.Conditions.Add(new Condition());
        context.PricesLists.Add(new PricesList());
        context.Roles.Add(new Role());

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }

    [Fact]
    public async Task AllTablesHaveData_ReturnsFalse_WhenRolesTableIsEmpty()
    {
        var context = GetDbContext();

        context.Conditions.Add(new Condition());
        context.PricesLists.Add(new PricesList());
        context.RoomsDBs.Add(new RoomsDB());

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.AllTablesHaveData();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<bool>(okResult.Value);

        Assert.False(value);
    }

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