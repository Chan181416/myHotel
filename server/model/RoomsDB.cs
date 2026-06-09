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
        // public bool OnSea { get; set; }
        // public bool Extrta { get; set; }

        public Guid ConditionId { get; set; }
        [ForeignKey("ConditionId")]
        public Condition? Condition { get; set; }

        public int Sumbed{ get; set; }
        public List<RoomLocation> RoomLocations { get; set; } = [];

    }

    public class RoomsDBDTO
    {

        public int RoomNum { get; set; }
        public int Floor { get; set; }
        public Guid ConditionId { get; set; }
        public int Sumbed{ get; set; }

    }

}
