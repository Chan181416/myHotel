using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.Model
{
    public class Role
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int idNumber { get; set; }
        public int Num { get; set; }

    }
    public class RoleDTO
    {
        public string? Name { get; set; }
        public int idNumber { get; set; }
        public int Num { get; set; }

    }
}
