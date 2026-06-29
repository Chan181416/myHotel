using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid()
        };

        var condition = new Condition
        {
            Id = Guid.NewGuid()
        };

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
        Assert.Equal("123", value.NumberId);
        Assert.Equal(2, value.SumPlace);
        Assert.Equal(500, value.TotalPrice);
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

        var price = new PricesList { IdPrice = Guid.NewGuid() };
        var condition = new Condition { Id = Guid.NewGuid() };

        context.PricesLists.Add(price);
        context.Conditions.Add(condition);
        await context.SaveChangesAsync();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "Test User",
            NumberId = "123",
            SumPlace = 2,
            TotalPrice = 500,
            PriceListId = price.IdPrice,
            ConditionId = condition.Id
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.Get(reg.Id);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal(reg.Id, value.Id);
    }

    // ---------------------------
    // UPDATE FIELD - NOT FOUND
    // ---------------------------

    [Fact]
    public async Task UpdateField_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.UpdateField(Guid.NewGuid(), "name", "x");

        Assert.IsType<NotFoundResult>(result);
    }

    // ---------------------------
    // UPDATE FIELD - NAME
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

    // ---------------------------
    // UPDATE FIELD - NUMBERID
    // ---------------------------

    [Fact]
    public async Task UpdateField_UpdatesNumberId()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            NumberId = "111"
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "numberid", "222");

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal("222", value.NumberId);
    }

    // ---------------------------
    // UPDATE FIELD - SUMPLACE
    // ---------------------------

    [Fact]
    public async Task UpdateField_UpdatesSumPlace()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            SumPlace = 1
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "sumplace", "5");

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal(5, value.SumPlace);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenSumPlaceInvalid()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "sumplace", "abc");

        Assert.IsType<BadRequestResult>(result);
    }

    // ---------------------------
    // UPDATE FIELD - TOTALPRICE
    // ---------------------------

    [Fact]
    public async Task UpdateField_UpdatesTotalPrice()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            TotalPrice = 100
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "totalprice", "999");

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal(999, value.TotalPrice);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenTotalPriceInvalid()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "totalprice", "abc");

        Assert.IsType<BadRequestResult>(result);
    }

    // ---------------------------
    // UPDATE FIELD - EVENT
    // ---------------------------

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenEventGuidInvalid()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "event", "not-guid");

        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenEventNotFound()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(
            reg.Id,
            "event",
            Guid.NewGuid().ToString());

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_UpdatesEvent()
    {
        var context = GetDbContext();

        var eventItem = new PricesList
        {
            IdPrice = Guid.NewGuid()
        };

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.PricesLists.Add(eventItem);
        context.Registereds.Add(reg);

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(
            reg.Id,
            "event",
            eventItem.IdPrice.ToString());

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal(eventItem.IdPrice, value.PriceListId);
    }

    // ---------------------------
    // UPDATE FIELD - CONDITION
    // ---------------------------

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenConditionGuidInvalid()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(reg.Id, "condition", "not-guid");

        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenConditionNotFound()
    {
        var context = GetDbContext();

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(
            reg.Id,
            "condition",
            Guid.NewGuid().ToString());

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_UpdatesCondition()
    {
        var context = GetDbContext();

        var condition = new Condition
        {
            Id = Guid.NewGuid()
        };

        var reg = new Registereds
        {
            Id = Guid.NewGuid()
        };

        context.Conditions.Add(condition);
        context.Registereds.Add(reg);

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.UpdateField(
            reg.Id,
            "condition",
            condition.Id.ToString());

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<Registereds>(ok.Value);

        Assert.Equal(condition.Id, value.ConditionId);
    }

    // ---------------------------
    // UPDATE FIELD - INVALID FIELD
    // ---------------------------

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
            Name = "Test",
            NumberId = "123",
            SumPlace = 2,
            TotalPrice = 500
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.Delete(reg.Id);

        Assert.IsType<OkResult>(result);

        Assert.Empty(await context.Registereds.ToListAsync());

        var history = Assert.Single(context.RegisteredsHistory);

        Assert.Equal(reg.Id, history.OriginalRegisteredId);
        Assert.Equal(reg.Name, history.Name);
        Assert.Equal(reg.NumberId, history.NumberId);
        Assert.Equal(reg.SumPlace, history.SumPlace);
        Assert.Equal(reg.TotalPrice, history.TotalPrice);
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

        var price = new PricesList { IdPrice = Guid.NewGuid() };
        var condition = new Condition { Id = Guid.NewGuid() };

        context.PricesLists.Add(price);
        context.Conditions.Add(condition);
        await context.SaveChangesAsync();

        var reg = new Registereds
        {
            Id = Guid.NewGuid(),
            Name = "A",
            NumberId = "123",
            SumPlace = 2,
            TotalPrice = 100,
            PriceListId = price.IdPrice,
            ConditionId = condition.Id
        };

        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetAllRegistereds();

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var value = Assert.IsType<List<Registereds>>(ok.Value);

        Assert.Single(value);
    }
}