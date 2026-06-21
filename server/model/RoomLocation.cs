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
}
