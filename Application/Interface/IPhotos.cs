using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interface
{
    public interface IPhotos
    {
        Task<PhotoUploadResult> UploadPhoto(IFormFile file);
        Task<bool> DeletePhoto(string fileName);
    }
}
