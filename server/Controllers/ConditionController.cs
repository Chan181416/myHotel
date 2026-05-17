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
        }[HttpGet]
        public async Task<ActionResult<IEnumerable<Condition>>> GetConditions(int skip = 0, int take = 10)
        {
            return await _Context.Conditions.Skip(skip).Take(take).ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Condition>> CreateCondition(ConditionDTO condition)
        
            {
                if (condition.Num < 0 )
                {
                     return BadRequest("The num is required.");
                }

                    var newcondition = new Condition
                    {
                        Num = condition.Num,
                        Price = condition.Price,

                    };
                _Context.Conditions.Add(newcondition);
                await _Context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetConditions), new { id = newcondition.Id }, newcondition);
            }
        }


    }

