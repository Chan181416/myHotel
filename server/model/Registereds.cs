
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.model.server.Model;

namespace server.model
{
    public class Registereds
    {
        [Key]
        public Guid Id {get; set;}
        public string? NumberId { get; set; }
        public string? Name { get; set; }
       
        public int SumPlace { get; set; }
        
        public int TotalPrice { get; set; }


        public List<PricesList> ListPricesList { get; set; }
        public List<Condition> ListCondition { get; set; }
    }

    public class RegisteredsDTO
    {
        
    }
}