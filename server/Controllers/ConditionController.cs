using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Controller;
using server.model;
using server.Model;

namespace server.Controller
{
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
        public async Task<ActionResult<IEnumerable<Condition>>> GetConditions(int skip = 0, int take = 10)
        {
            return await _Context.Conditions.Skip(skip).Take(take).ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Condition>> CreateCondition(ConditionDTO condition)

        {
            if (condition.Price < 0)
            {
                return BadRequest("The price is required.");
            }
            if (condition.Option == " ")
            {
                return BadRequest("The condition is required.");
            }

            var newcondition = new Condition
            {
                Price = condition.Price,
                Option = condition.Option,

            };
            _Context.Conditions.Add(newcondition);
            await _Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConditions), new { id = newcondition.Id }, newcondition);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPriceById(int id)
        {
            // מחפש את הרשומה לפי IdPrice
            var price = await _Context.Conditions
                                      .Where(p => p.Id == id)
                                     
                                      .FirstOrDefaultAsync();

            // אם הרשומה לא קיימת מחזירים 404
            if (price == null)
                return NotFound();

            // מחזיר את הערך של Price בלבד
            return Ok(price.Price);
        }
    }


}

