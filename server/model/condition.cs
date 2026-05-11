using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.Model
{
    public class Condition
    {
        public Guid Id { get; set; }

        public int Num { get; set; }

        public int Price { get; set; }
    }
}


