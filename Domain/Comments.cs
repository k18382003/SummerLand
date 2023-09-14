using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Comments
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;
        public AppUser Commenter { get; set; }
        public Articles Article { get; set; }
    }
}
