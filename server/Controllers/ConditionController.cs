
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Controller;
using server.model;

namespace server.Controller;

[ApiController]
[Route("[controller]")]
public class ConditionController : ControllerBase
{
    private readonly MyHotelDbContext _Context;

    public ConditionController(MyHotelDbContext context)
    {
        _Context = context;
    }

    [HttpGet]
    public async ActionResult Get(int take = 10, int skip = 0)
    {
        return await(_Context.Condition.OrderBy(p => p.ProductId).Skip(skip).Take(take));
    }
}  


