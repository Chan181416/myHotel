using System.ComponentModel.DataAnnotations;
namespace server.model
{
    public class EnumPrice
    {
        [Key]
        public Guid Id { get; set; }
        public string? Events { get; set; }
    }
}
