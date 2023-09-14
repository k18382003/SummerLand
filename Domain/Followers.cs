using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Followers
    {
        public string FolloweeID { get; set; }

        public string FollowerID { get; set; }

        public AppUser Followee { get; set; }

        public AppUser Follower { get; set; }
    }
}
