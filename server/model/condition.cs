using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.ConditionEnum
{
    namespace server.Model
    {
        public class Condition
        {
            public Guid Id { get; set; }

            [ForeignKey("ConditionEnum")]
            public int Num { get; set; }

            public int price { get; set; }
        }
    }
}

