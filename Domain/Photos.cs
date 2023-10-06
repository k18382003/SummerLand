using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Photos
    {
        [Key]
        public string photoId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}
