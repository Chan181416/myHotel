using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Model;

namespace server.model
{
    public class RoomsDB
    {
        [Key]
        public Guid Id { get; set; }

        public int RoomNum { get; set; }
        public int Floor { get; set; }
        public Guid ConditionId { get; set; }
        [ForeignKey("ConditionId")]
        public Condition? Condition { get; set; }

        public int Sumbed { get; set; }
        public List<RoomLocation> RoomLocations { get; set; } = [];

    }

    public class RoomsDBDTO
    {

        public int RoomNum { get; set; }
        public int Floor { get; set; }
        public Guid ConditionId { get; set; }
        public int Sumbed { get; set; }
        public List<Guid> RoomLocations { get; set; } = [];

    }

    public class RoomsDBDTOs
    {
        public Guid Id { get; set; }
        public int RoomNum { get; set; }
        public int Floor { get; set; }
        public Guid ConditionId { get; set; }
        public int Sumbed { get; set; }
        public List<Guid> RoomLocations { get; set; } = [];
    }
    public class AddRoomLocationDTO
    {
        public Guid RoomId { get; set; }
        public Guid RoomLocationId { get; set; }
    }
}
