using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

public class PricesListControllerTests
{
    private MyHotelDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<MyHotelDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new MyHotelDbContext(options);
    }

    private PricesListController GetController(MyHotelDbContext context)
    {
        return new PricesListController(context);
    }

    // -------------------------
    // CREATE - success
    // -------------------------
    [Fact]
    public async Task CreatePrice_ReturnsNoContent_WhenValid()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var dto = new PricesListDTO
        {
            Price = 100,
            Event = "Wedding"
        };

        var result = await controller.CreatePrice(dto);

        Assert.IsType<NoContentResult>(result);
        Assert.Single(context.PricesLists);
    }

    // -------------------------
    // CREATE - duplicate event
    // -------------------------
    [Fact]
    public async Task CreatePrice_ReturnsBadRequest_WhenDuplicateEvent()
    {
        var context = GetDbContext();

        context.PricesLists.Add(new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 100,
            Event = "Wedding"
        });

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new PricesListDTO
        {
            Price = 200,
            Event = "Wedding"
        };

        var result = await controller.CreatePrice(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // -------------------------
    // UPDATE - success
    // -------------------------
    [Fact]
    public async Task UpdatePrice_ReturnsOk_WhenValid()
    {
        var context = GetDbContext();

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 100,
            Event = "Event1"
        };

        context.PricesLists.Add(price);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new PricesListDTO
        {
            Price = 200,
            Event = "Event2"
        };

        var result = await controller.UpdatePrice(price.IdPrice, dto);

        var ok = Assert.IsType<OkObjectResult>(result);
        var updated = Assert.IsType<PricesList>(ok.Value);

        Assert.Equal(200, updated.Price);
        Assert.Equal("Event2", updated.Event);
    }

    // -------------------------
    // UPDATE - not found
    // -------------------------
    [Fact]
    public async Task UpdatePrice_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var dto = new PricesListDTO
        {
            Price = 100,
            Event = "X"
        };

        var result = await controller.UpdatePrice(Guid.NewGuid(), dto);

        Assert.IsType<NotFoundResult>(result);
    }

    // -------------------------
    // UPDATE - duplicate event
    // -------------------------
    [Fact]
    public async Task UpdatePrice_ReturnsBadRequest_WhenEventAlreadyExists()
    {
        var context = GetDbContext();

        var first = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 100,
            Event = "Wedding"
        };

        var second = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 200,
            Event = "Party"
        };

        context.PricesLists.Add(first);
        context.PricesLists.Add(second);

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new PricesListDTO
        {
            Price = 300,
            Event = "Party"
        };

        var result = await controller.UpdatePrice(first.IdPrice, dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // -------------------------
    // GET price by event
    // -------------------------
    [Fact]
    public async Task GetPriceByEvent_ReturnsPrice_WhenExists()
    {
        var context = GetDbContext();

        context.PricesLists.Add(new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 300,
            Event = "Concert"
        });

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetPriceByEvent("Concert");

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(300, ok.Value);
    }

    // -------------------------
    // GET price by event - not found
    // -------------------------
    [Fact]
    public async Task GetPriceByEvent_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.GetPriceByEvent("None");

        Assert.IsType<NotFoundResult>(result);
    }

    // -------------------------
    // GET id by event
    // -------------------------
    [Fact]
    public async Task GetIdByEvent_ReturnsId_WhenExists()
    {
        var context = GetDbContext();

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 500,
            Event = "Party"
        };

        context.PricesLists.Add(price);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetIdByEvent("Party");

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(price.IdPrice, ok.Value);
    }

    // -------------------------
    // GET id by event - not found
    // -------------------------
    [Fact]
    public async Task GetIdByEvent_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.GetIdByEvent("DoesNotExist");

        Assert.IsType<NotFoundResult>(result);
    }

    // -------------------------
    // GET price by id
    // -------------------------
    [Fact]
    public async Task GetPriceById_ReturnsPrice_WhenExists()
    {
        var context = GetDbContext();

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 999,
            Event = "VIP"
        };

        context.PricesLists.Add(price);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetPriceById(price.IdPrice);

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(999, ok.Value);
    }

    // -------------------------
    // GET price by id - not found
    // -------------------------
    [Fact]
    public async Task GetPriceById_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.GetPriceById(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    // -------------------------
    // DELETE - success + history
    // -------------------------
    [Fact]
    public async Task DeletePrice_ReturnsOk_AndMovesToHistory()
    {
        var context = GetDbContext();

        var price = new PricesList
        {
            IdPrice = Guid.NewGuid(),
            Price = 150,
            Event = "DeleteTest"
        };

        context.PricesLists.Add(price);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.DeletePrice(price.IdPrice);

        Assert.IsType<OkObjectResult>(result);

        Assert.Empty(context.PricesLists);

        var history = Assert.Single(context.PricesListHistories);
        Assert.Equal(price.IdPrice, history.IdPrice);
        Assert.Equal(price.Price, history.Price);
        Assert.Equal(price.Event, history.Event);
    }

    // -------------------------
    // DELETE - not found
    // -------------------------
    [Fact]
    public async Task DeletePrice_ReturnsNotFound_WhenMissing()
    {
        var context = GetDbContext();
        var controller = GetController(context);

        var result = await controller.DeletePrice(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }
}