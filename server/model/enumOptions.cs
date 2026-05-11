using System.ComponentModel.DataAnnotations;
namespace server.model
{
    public class EnumOptions
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string? Events { get; set; }
    }

}
