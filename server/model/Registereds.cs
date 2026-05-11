
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
        public string? name { get; set; }
       
        public int sumPlace { get; set; }
        
        public int totalPrice { get; set; }


        public List<PricesList> ListPricesList { get; set; }
        public List<Condition> ListCondition { get; set; }
    }

    public class RegisteredsDTO
    {
        
    }
}