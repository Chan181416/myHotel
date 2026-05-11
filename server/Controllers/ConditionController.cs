using Microsoft.AspNetCore.Mvc;
using server.Date;


namespace server.controllers;

[ApiController]
[Route("[controller]")]
public class ConditionController : ControllerBase
{
    private readonly myHotelDbContext _context;
    public ConditionController (myHotelDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult Get(int take = 10, int skip = 0)
   {
       return Ok(_context.Conditions.OrderBy(p => p.Id).Skip(skip).Take(take));
   }
}