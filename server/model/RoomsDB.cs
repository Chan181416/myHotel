using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.model
{
    public class RoomsDB
    {
        [Key]
        public Guid RoomNum { get; set; }
        public int Floor { get; set; }
        public bool OnSea { get; set; }
        public bool Extrta { get; set; }
        public string? Occupied { get; set; }
    }

    public class RoomsDBDTO
    {
        public int Floor { get; set; }
        public bool OnSea { get; set; }
        public bool Extrta { get; set; }
    }


}