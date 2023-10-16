using Application.Interface;
using Infrustructure.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Application.Photos
{
    public class PhotoAccessor : IPhotos
    {

        private readonly Cloudinary _cloudinary;
        private readonly IUserAccessor _User;

        public PhotoAccessor(IOptions<CloudinarySetting> config, IUserAccessor user)
        {
            _cloudinary = new Cloudinary(new Account(
                    cloud: config.Value.CloudinaryName,
                    apiKey: config.Value.Cloudinary_API_Key,
                    apiSecret: config.Value.Cloudinary_API_Secrete
                ));

            _User = user;
        }
        public async Task<PhotoUploadResult> UploadPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                
                var fileName = _User.GetUserName() + '_' + Guid.NewGuid().ToString();

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Width(150).Height(150).Crop("fill"),
                    PublicId = fileName
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null) 
                    throw new Exception(uploadResult.Error.Message);

                return new PhotoUploadResult
                {
                    ContentType = file.ContentType,
                    Name = uploadResult.PublicId,
                    Uri = uploadResult.Url.ToString()
                };
                
            }

            return null;

        }

        public async Task<bool> DeletePhoto(string publicId)
        {
            var deleteParam = new DeletionParams(publicId);
            var deleteResult = await _cloudinary.DestroyAsync(deleteParam);
            return deleteResult.Result == "ok" ? true : false;
        }

    }
}
