using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.Model
{
    public class Condition
    {
        public int Id { get; set; }
        public string? Option { get; set; }
        public int Price { get; set; }
    }
     public class ConditionDTO
    {
        public string? Option { get; set; }
        public int Price { get; set; }
    }
    
       
}


