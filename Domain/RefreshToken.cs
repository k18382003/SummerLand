using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class RefreshToken
    {
        public int id { get; set; }
        public AppUser user { get; set; }
        public string token { get; set; }
        public DateTime expiry { get; set; } = DateTime.UtcNow.AddDays(7);
        public bool isExpired => expiry <= DateTime.UtcNow;
        public DateTime? revoked { get; set; }
        public bool isActive => !isExpired && revoked == null;
    }
}
