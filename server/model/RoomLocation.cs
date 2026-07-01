using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }
        public Guid Rooms { get; set; }
        [ForeignKey("Rooms")]
        public RoomsDB? Room { get; set; }
        public Guid RegisteredsId { get; set; }
        [ForeignKey("RegisteredsId")]
        public Registereds? Registereds { get; set; }
    }
    public class RoomLocationDTO
    {
        public Guid Rooms { get; set; }
        public Guid RegisteredsId { get; set; }

    }
    public class RoomLocationViewDTO
    {
        public Guid Id { get; set; }

        // Registered
        public string? Name { get; set; }
        public string? Phone { get; set; } // או NumberId אצלך
        public string? Event { get; set; }

        // Room
        public int RoomNum { get; set; }
        public int Floor { get; set; }
        public string? RoomCondition { get; set; }
    }
}
