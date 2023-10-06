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
