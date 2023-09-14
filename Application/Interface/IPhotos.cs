using Application.Core;
using Application.Photos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interface
{
    public interface IPhotos
    {
        Task<PhotoUploadResult> UploadPhoto(IFormFile file);
        Task<bool> DeletePhoto(string fileName);
    }
}
