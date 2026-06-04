using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.Model
{
    public class Role
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int IdNumber { get; set; }
        public int Code { get; set; }

    }
    public class RoleDTO
    {
        public string? Name { get; set; }
        public int IdNumber { get; set; }
        public int Code { get; set; }

    }
}
