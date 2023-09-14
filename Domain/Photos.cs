using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
