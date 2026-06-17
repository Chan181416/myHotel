// using Xunit;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Mvc;
// using server.Controller;
// using server.Data;
// using server.Model;
// using System;
// using System.Linq;
// using System.Threading.Tasks;
// using System.Collections.Generic;

// public class ConditionControllerTests
// {
//     private MyHotelDbContext GetDbContext()
//     {
//         var options = new DbContextOptionsBuilder<MyHotelDbContext>()
//             .UseInMemoryDatabase(Guid.NewGuid().ToString())
//             .Options;

//         return new MyHotelDbContext(options);
//     }

//     private ConditionController GetController(MyHotelDbContext context)
//     {
//         return new ConditionController(context);
//     }

//     // -------------------------
//     // GET: /Condition
//     // -------------------------
//     [Fact]
//     public async Task GetConditions_ReturnsPagedData()
//     {
//         var context = GetDbContext();

//         context.Conditions.Add(new Condition { Price = 10, Option = "A" });
//         context.Conditions.Add(new Condition { Price = 20, Option = "B" });
//         context.Conditions.Add(new Condition { Price = 30, Option = "C" });

//         await context.SaveChangesAsync();

//         var controller = GetController(context);

//         var result = await controller.GetConditions(0, 2);

//         Assert.Equal(2, result.Value.Count());
//     }

//     // -------------------------
//     // POST: valid create
//     // -------------------------
//     [Fact]
//     public async Task CreateCondition_ReturnsCreated_WhenValid()
//     {
//         var context = GetDbContext();
//         var controller = GetController(context);

//         var dto = new ConditionDTO
//         {
//             Price = 100,
//             Option = "Test"
//         };

//         var result = await controller.CreateCondition(dto);

//         var created = Assert.IsType<CreatedAtActionResult>(result.Result);
//         var value = Assert.IsType<Condition>(created.Value);

//         Assert.Equal(100, value.Price);
//         Assert.Equal("Test", value.Option);
//     }

//     // -------------------------
//     // POST: invalid price
//     // -------------------------
//     [Fact]
//     public async Task CreateCondition_ReturnsBadRequest_WhenPriceNegative()
//     {
//         var context = GetDbContext();
//         var controller = GetController(context);

//         var dto = new ConditionDTO
//         {
//             Price = -5,
//             Option = "Test"
//         };

//         var result = await controller.CreateCondition(dto);

//         Assert.IsType<BadRequestObjectResult>(result.Result);
//     }

//     // -------------------------
//     // POST: invalid option
//     // -------------------------
//     [Fact]
//     public async Task CreateCondition_ReturnsBadRequest_WhenOptionEmpty()
//     {
//         var context = GetDbContext();
//         var controller = GetController(context);

//         var dto = new ConditionDTO
//         {
//             Price = 10,
//             Option = " "
//         };

//         var result = await controller.CreateCondition(dto);

//         Assert.IsType<BadRequestObjectResult>(result.Result);
//     }

//     // -------------------------
//     // GET by ID - success
//     // -------------------------
//     [Fact]
//     public async Task GetPriceById_ReturnsPrice_WhenExists()
//     {
//         var context = GetDbContext();

//         var condition = new Condition
//         {
//             Id = Guid.NewGuid(),
//             Price = 250,
//             Option = "VIP"
//         };

//         context.Conditions.Add(condition);
//         await context.SaveChangesAsync();

//         var controller = GetController(context);

//         var result = await controller.GetPriceById(condition.Id);

//         var ok = Assert.IsType<OkObjectResult>(result);
//         Assert.Equal(250, ok.Value);
//     }

//     // -------------------------
//     // GET by ID - not found
//     // -------------------------
//     [Fact]
//     public async Task GetPriceById_ReturnsNotFound_WhenMissing()
//     {
//         var context = GetDbContext();
//         var controller = GetController(context);

//         var result = await controller.GetPriceById(Guid.NewGuid());

//         Assert.IsType<NotFoundResult>(result);
//     }

//     // -------------------------
//     // GET by option - success
//     // -------------------------
//     [Fact]
//     public async Task GetIdByOption_ReturnsId_WhenExists()
//     {
//         var context = GetDbContext();

//         var condition = new Condition
//         {
//             Id = Guid.NewGuid(),
//             Price = 100,
//             Option = "Gold"
//         };

//         context.Conditions.Add(condition);
//         await context.SaveChangesAsync();

//         var controller = GetController(context);

//         var result = await controller.GetIdByOption("Gold");

//         var ok = Assert.IsType<OkObjectResult>(result);
//         Assert.Equal(condition.Id, ok.Value);
//     }

//     // -------------------------
//     // GET by option - not found
//     // -------------------------
//     [Fact]
//     public async Task GetIdByOption_ReturnsNotFound_WhenMissing()
//     {
//         var context = GetDbContext();
//         var controller = GetController(context);

//         var result = await controller.GetIdByOption("DoesNotExist");

//         Assert.IsType<NotFoundResult>(result);
//     }
// }