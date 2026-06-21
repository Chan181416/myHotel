using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Threading.Tasks;

public class RoomLocationControllerTests
{
    private MyHotelDbContext GetContext()
    {
        var options = new DbContextOptionsBuilder<MyHotelDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new MyHotelDbContext(options);
    }

    private RoomLocationController GetController(MyHotelDbContext context)
    {
        return new RoomLocationController(context);
    }

    // -----------------------------------
    // POST - הצלחה
    // -----------------------------------
    [Fact]
    public async Task Add_ReturnsOk_WhenValidData()
    {
        var context = GetContext();

        var room = new RoomsDB { Id = Guid.NewGuid() };
        var reg = new Registereds { Id = Guid.NewGuid() };

        context.RoomsDBs.Add(room);
        context.Registereds.Add(reg);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new RoomLocationDTO
        {
            Rooms = room.Id,
            RegisteredsId = reg.Id
        };

        var result = await controller.Add(dto);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<RoomLocation>(ok.Value);

        Assert.Equal(room.Id, value.Rooms);
        Assert.Equal(reg.Id, value.RegisteredsId);
    }

    // -----------------------------------
    // POST - חדר לא קיים
    // -----------------------------------
    [Fact]
    public async Task Add_ReturnsBadRequest_WhenRoomNotFound()
    {
        var context = GetContext();

        var controller = GetController(context);

        var dto = new RoomLocationDTO
        {
            Rooms = Guid.NewGuid(),
            RegisteredsId = Guid.NewGuid()
        };

        var result = await controller.Add(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // -----------------------------------
    // POST - Registered לא קיים
    // -----------------------------------
    [Fact]
    public async Task Add_ReturnsBadRequest_WhenRegisteredNotFound()
    {
        var context = GetContext();

        var room = new RoomsDB { Id = Guid.NewGuid() };
        context.RoomsDBs.Add(room);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new RoomLocationDTO
        {
            Rooms = room.Id,
            RegisteredsId = Guid.NewGuid()
        };

        var result = await controller.Add(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // -----------------------------------
    // GET by Id - הצלחה
    // -----------------------------------
    [Fact]
    public async Task GetById_ReturnsOk_WhenExists()
    {
        var context = GetContext();

        var roomLocation = new RoomLocation
        {
            Id = Guid.NewGuid(),
            Rooms = Guid.NewGuid(),
            RegisteredsId = Guid.NewGuid()
        };

        context.RoomLocations.Add(roomLocation);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetById(roomLocation.Id);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<RoomLocation>(ok.Value);

        Assert.Equal(roomLocation.Id, value.Id);
    }

    // -----------------------------------
    // GET by Id - לא קיים
    // -----------------------------------
    [Fact]
    public async Task GetById_ReturnsNotFound_WhenMissing()
    {
        var context = GetContext();
        var controller = GetController(context);

        var result = await controller.GetById(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    // -----------------------------------
    // GET all
    // -----------------------------------
    [Fact]
    public async Task GetAll_ReturnsOkList()
    {
        var context = GetContext();

        context.RoomLocations.Add(new RoomLocation
        {
            Id = Guid.NewGuid(),
            Rooms = Guid.NewGuid(),
            RegisteredsId = Guid.NewGuid()
        });

        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.GetAll();

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<System.Collections.Generic.List<RoomLocation>>(ok.Value);

        Assert.True(value.Count >= 1);
    }

    // -----------------------------------
    // PATCH - הצלחה
    // -----------------------------------
    [Fact]
    public async Task Update_ReturnsOk_WhenValid()
    {
        var context = GetContext();

        var room1 = new RoomsDB { Id = Guid.NewGuid() };
        var room2 = new RoomsDB { Id = Guid.NewGuid() };
        var reg1 = new Registereds { Id = Guid.NewGuid() };
        var reg2 = new Registereds { Id = Guid.NewGuid() };
        context.RoomsDBs.AddRange(room1, room2);
        context.Registereds.AddRange(reg1, reg2);

        var entity = new RoomLocation
        {
            Id = Guid.NewGuid(),
            Rooms = room1.Id,
            RegisteredsId = reg1.Id
        };

        context.RoomLocations.Add(entity);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var dto = new RoomLocationDTO
        {
            Rooms = room2.Id,
            RegisteredsId = reg2.Id
        };

        var result = await controller.Update(entity.Id, dto);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<RoomLocation>(ok.Value);

        Assert.Equal(room2.Id, value.Rooms);
        Assert.Equal(reg2.Id, value.RegisteredsId);
    }

    // -----------------------------------
    // DELETE - הצלחה
    // -----------------------------------
    [Fact]
    public async Task Delete_ReturnsOk_WhenExists()
    {
        var context = GetContext();

        var entity = new RoomLocation
        {
            Id = Guid.NewGuid(),
            Rooms = Guid.NewGuid(),
            RegisteredsId = Guid.NewGuid()
        };

        context.RoomLocations.Add(entity);
        await context.SaveChangesAsync();

        var controller = GetController(context);

        var result = await controller.Delete(entity.Id);

        Assert.IsType<OkResult>(result);
    }

    // -----------------------------------
    // DELETE - לא קיים
    // -----------------------------------
    [Fact]
    public async Task Delete_ReturnsNotFound_WhenMissing()
    {
        var context = GetContext();
        var controller = GetController(context);

        var result = await controller.Delete(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }
}