using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Threading.Tasks;

public class RegisteredsControllerTests
{
    private MyHotelDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<MyHotelDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new MyHotelDbContext(options);
    }

    private RegisteredsController GetController(MyHotelDbContext context)
    {
        return new RegisteredsController(context);
    }

    // ---------------------------
    // ADD
    // ---------------------------

    [Fact]
    public async Task Add_ReturnsBadRequest_WhenEventNotFound()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var dto = new RegisteredsCreateDTO
        {
            Event = Guid.NewGuid(),
            Condition = Guid.NewGuid()
        };

        var result = await controller.Add(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Add_ReturnsBadRequest_WhenConditionNotFound()
    {
        var context = GetDbContext();

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid()
        };
        context.PricesLists.Add(price);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new RegisteredsCreateDTO
        {
            Event = price.IdPrice,
            Condition = Guid.NewGuid()
        };

        var result = await controller.Add(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Add_ReturnsOk_WhenValid()
    {
        var context = GetDbContext();

        var price = new PricesList { IdPrice = Guid.NewGuid() };
        var condition = new Condition { Id = Guid.NewGuid() };

        context.PricesLists.Add(price);
        context.Conditions.Add(condition);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new RegisteredsCreateDTO
        {
            Event = price.IdPrice,
            Condition = condition.Id,
            Name = "Test",
            NumberId = "123",
            SumPlace = 2,
            TotalPrice = 500
        };

        var result = await controller.Add(dto);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal("Test", value.Name);
    }

    // ---------------------------
    // GET
    // ---------------------------

    [Fact]
    public async Task Get_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.Get(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task Get_ReturnsOk_WhenExists()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "Test"
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.Get(reg.Id);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal("Test", value.Name);
    }

    // ---------------------------
    // UPDATE FIELD
    // ---------------------------

    [Fact]
    public async Task UpdateField_UpdatesName()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "Old"
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "name", "New");

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal("New", value.Name);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_OnInvalidField()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "invalid", "x");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.UpdateField(Guid.NewGuid(), "name", "x");

        Assert.IsType<NotFoundResult>(result);
    }

    // ---------------------------
    // DELETE
    // ---------------------------

    [Fact]
    public async Task Delete_RemovesAndCreatesHistory()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "Test"
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.Delete(reg.Id);

        Assert.IsType<OkResult>(result);
        Assert.Empty(context.Registereds.ToListAsync().Result);
        Assert.Single(context.RegisteredsHistory);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.Delete(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    // ---------------------------
    // GET ALL
    // ---------------------------

    [Fact]
    public async Task GetAll_ReturnsOkList()
    {
        var context = GetDbContext();

        context.Registereds.Add(new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "A"
        });

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetAllRegistereds();

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var list = Assert.IsType<System.Collections.Generic.List<Registereds>>(ok.Value);

        Assert.Single(list);
    }
}