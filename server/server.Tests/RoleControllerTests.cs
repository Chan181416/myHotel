using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Controllers;
using server.Data;
using server.Models;
using System;
using System.Threading.Tasks;

public class RoleControllerTests
{
    private MyHotelDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<MyHotelDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new MyHotelDbContext(options);
    }

    [Fact]
    public async Task AddRole_ReturnsOk_WhenRoleDoesNotExist()
    {
        var context = GetDbContext();

        var controller = new RoleController(context);

        var dto = new RoleDTO
        {
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        var result = await controller.AddRole(dto);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task AddRole_ReturnsBadRequest_WhenRoleAlreadyExists()
    {
        var context = GetDbContext();

        context.Roles.Add(new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        });

        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var dto = new RoleDTO
        {
            Name = "Manager",
            IdNumber = 123,
            Code = 2
        };

        var result = await controller.AddRole(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_Name_ReturnsOk()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "OldName",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "name",
            "NewName");

        var okResult = Assert.IsType<OkObjectResult>(result);
        var updatedRole = Assert.IsType<Role>(okResult.Value);

        Assert.Equal("NewName", updatedRole.Name);
    }

    [Fact]
    public async Task UpdateField_IdNumber_ReturnsOk()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "idnumber",
            "999");

        var okResult = Assert.IsType<OkObjectResult>(result);
        var updatedRole = Assert.IsType<Role>(okResult.Value);

        Assert.Equal(999, updatedRole.IdNumber);
    }

    [Fact]
    public async Task UpdateField_IdNumber_ReturnsBadRequest_WhenValueIsNotNumber()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "idnumber",
            "abc");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_Code_ReturnsOk()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "Code",
            "555");

        var okResult = Assert.IsType<OkObjectResult>(result);
        var updatedRole = Assert.IsType<Role>(okResult.Value);

        Assert.Equal(555, updatedRole.Code);
    }

    [Fact]
    public async Task UpdateField_Code_ReturnsBadRequest_WhenValueIsNotNumber()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "Code",
            "abc");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_ReturnsBadRequest_WhenFieldNameInvalid()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            role.Id,
            "InvalidField",
            "123");

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task UpdateField_ReturnsNotFound_WhenRoleDoesNotExist()
    {
        var context = GetDbContext();

        var controller = new RoleController(context);

        var result = await controller.UpdateField(
            Guid.NewGuid(),
            "name",
            "NewName");

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetById_ReturnsRole_WhenExists()
    {
        var context = GetDbContext();

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.GetById(role.Id);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenRoleDoesNotExist()
    {
        var context = GetDbContext();

        var controller = new RoleController(context);

        var result = await controller.GetById(Guid.NewGuid());

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetByNameAndId_ReturnsRole_WhenExists()
    {
        var context = GetDbContext();

        context.Roles.Add(new Role
        {
            Id = Guid.NewGuid(),
            Name = "Manager",
            IdNumber = 123,
            Code = 1
        });

        await context.SaveChangesAsync();

        var controller = new RoleController(context);

        var result = await controller.getByNameAndId("Manager", 123);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetByNameAndId_ReturnsNotFound_WhenRoleDoesNotExist()
    {
        var context = GetDbContext();

        var controller = new RoleController(context);

        var result = await controller.getByNameAndId("Manager", 999);

        Assert.IsType<NotFoundObjectResult>(result);
    }
}