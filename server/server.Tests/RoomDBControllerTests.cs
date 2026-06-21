using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using server.Tests.Helpers;

public class RoomDBControllerTests
{
    private MyHotelDbContext GetContext()
    {
        return DbContextFactory.Create();
    }

    private RoomDBController GetController(MyHotelDbContext context)
    {
        return new RoomDBController(context);
    }

    // -----------------------------
    // CREATE ROOM - success
    // -----------------------------
    [Fact]
    public async Task CreateRoom_ReturnsNoContent_WhenValid()
    {
        var context = GetContext();
        var controller = GetController(context);

        var conditionId = Guid.NewGuid();

        context.Conditions.Add(new Condition
        {
            Id = conditionId,
            Option = "Clean",
            Price = 100
        });

        await context.SaveChangesAsync();

        var dto = new RoomsDBDTO
        {
            RoomNum = 101,
            Floor = 1,
            ConditionId = conditionId,
            Sumbed = 2
        };

        var result = await controller.CreateRoom(dto);

        Assert.IsType<NoContentResult>(result);
    }

    // -----------------------------
    // CREATE ROOM - duplicate
    // -----------------------------
    [Fact]
    public async Task CreateRoom_ReturnsBadRequest_WhenRoomExists()
    {
        var context = GetContext();
        var controller = GetController(context);

        var conditionId = Guid.NewGuid();

        context.Conditions.Add(new Condition
        {
            Id = conditionId,
            Option = "Clean",
            Price = 100
        });

        context.RoomsDBs.Add(new RoomsDB
        {
            Id = Guid.NewGuid(),
            RoomNum = 101,
            Floor = 1,
            ConditionId = conditionId,
            Sumbed = 2,
            RoomLocations = new List<RoomLocation>()
        });

        await context.SaveChangesAsync();

        var dto = new RoomsDBDTO
        {
            RoomNum = 101,
            Floor = 2,
            ConditionId = conditionId,
            Sumbed = 3
        };

        var result = await controller.CreateRoom(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // -----------------------------
    // GET ALL ROOMS
    // -----------------------------
    [Fact]
    public async Task GetAllRooms_ReturnsOkList()
    {
        var context = GetContext();
        var controller = GetController(context);

        var conditionId = Guid.NewGuid();

        context.Conditions.Add(new Condition
        {
            Id = conditionId,
            Option = "Clean",
            Price = 100
        });

        context.RoomsDBs.Add(new RoomsDB
        {
            Id = Guid.NewGuid(),
            RoomNum = 102,
            Floor = 1,
            ConditionId = conditionId,
            Sumbed = 2,
            RoomLocations = new List<RoomLocation>()
        });

        await context.SaveChangesAsync();

        var result = await controller.GetAllRooms();

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<List<RoomsDB>>(ok.Value);

        Assert.True(value.Count > 0);
    }

    // -----------------------------
    // GET BY ID - success
    // -----------------------------
    [Fact]
    public async Task GetRoomById_ReturnsOk_WhenExists()
    {
        var context = GetContext();
        var controller = GetController(context);

        var conditionId = Guid.NewGuid();

        context.Conditions.Add(new Condition
        {
            Id = conditionId,
            Option = "Clean",
            Price = 100
        });

        var room = new RoomsDB
        {
            Id = Guid.NewGuid(),
            RoomNum = 103,
            Floor = 1,
            ConditionId = conditionId,
            Sumbed = 2,
            RoomLocations = new List<RoomLocation>()
        };

        context.RoomsDBs.Add(room);
        await context.SaveChangesAsync();

        var result = await controller.GetRoomById(room.Id);

        var ok = Assert.IsType<OkObjectResult>(result);
        var value = Assert.IsType<RoomsDB>(ok.Value);

        Assert.Equal(room.Id, value.Id);
    }

    // -----------------------------
    // GET BY ID - not found
    // -----------------------------
    [Fact]
    public async Task GetRoomById_ReturnsNotFound_WhenMissing()
    {
        var context = GetContext();
        var controller = GetController(context);

        var result = await controller.GetRoomById(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    // -----------------------------
    // GET FIELDS BY ROOM NUM
    // -----------------------------
    [Fact]
    public async Task GetRoomFields_ReturnsOk_WhenExists()
    {
        var context = GetContext();
        var controller = GetController(context);

        var conditionId = Guid.NewGuid();

        var condition = new Condition
        {
            Id = conditionId,
            Option = "Clean",
            Price = 100
        };

        context.Conditions.Add(condition);

        var room = new RoomsDB
        {
            Id = Guid.NewGuid(),
            RoomNum = 200,
            Floor = 2,
            ConditionId = conditionId,
            Sumbed = 2
        };

        context.RoomsDBs.Add(room);

        await context.SaveChangesAsync();

        var result = await controller.GetRoomFields(200);

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(ok.Value);
    }

    // -----------------------------
    // GET FIELDS - not found
    // -----------------------------
    [Fact]
    public async Task GetRoomFields_ReturnsNotFound_WhenMissing()
    {
        var context = GetContext();
        var controller = GetController(context);

        var result = await controller.GetRoomFields(999);

        Assert.IsType<NotFoundResult>(result);
    }
}