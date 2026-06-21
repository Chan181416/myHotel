
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;

namespace server.Models
{
    public class Registereds
    {
        [Key]
        public Guid Id { get; set; }
        public string? NumberId { get; set; }
        public string? Name { get; set; }
        public int SumPlace { get; set; }
        public int TotalPrice { get; set; }
        
        public Guid PriceListId { get; set; }
        [ForeignKey("PriceListId")]
        public PricesList? Event { get; set; }
        
        public Guid ConditionId { get; set; }
        [ForeignKey("ConditionId")]
        public Condition? Condition { get; set; }
        
        public List<RoomLocation> Rooms { get; set; }=[];
    }

    public class RegisteredsCreateDTO
    {
        public string? NumberId { get; set; }
        public string? Name { get; set; }
        public int SumPlace { get; set; }
        public int TotalPrice { get; set; }
        public Guid Event { get; set; }
        public Guid Condition { get; set; }
    }
    public class RegisteredsHistory
{
    [Key]
    public Guid Id { get; set; }

    public Guid OriginalRegisteredId { get; set; }

    public string? NumberId { get; set; }
    public string? Name { get; set; }
    public int SumPlace { get; set; }
    public int TotalPrice { get; set; }

    public Guid PriceListId { get; set; }
    public Guid ConditionId { get; set; }

    public DateTime DeletedAt { get; set; }
}
}