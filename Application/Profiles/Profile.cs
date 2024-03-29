﻿namespace Application.Profiles
{
    public class Profile
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; }
        public int Followers { get; set; }
        public int Followings { get; set; }
        public int Articles { get; set; }
        public ICollection<Domain.Photos> Photos { get; set; }
    }
}
