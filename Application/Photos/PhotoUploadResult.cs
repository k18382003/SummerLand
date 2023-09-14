using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class PhotoUploadResult
    {
        public string Name { get; set; }
        public string Uri { get; set; }
        public string ContentType { get; set; }
        public bool IsMain { get; set; }
    }
}
