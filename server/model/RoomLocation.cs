using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }

        public Guid Rooms { get; set; }
        [ForeignKey("Rooms")]
        public RoomDB? Room { get; set; }
        public Guid RegisteredsId { get; set; } 
        [ForeignKey("Registereds")]
        public Registereds? Registereds { get; set; }
    }
     public class RoomLocationDTO 
    {
        public Guid Rooms { get; set; }
        public Guid RegisteredsId { get; set; } 

    }
}
