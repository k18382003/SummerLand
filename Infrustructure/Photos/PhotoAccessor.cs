using Application.Interface;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Infrustructure.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Drawing;
using ImageMagick;

namespace Application.Photos
{
    public class PhotoAccessor : IPhotos
    {

        private readonly AzureSetting _AzureSetting;
        private readonly IUserAccessor _User;
        private const string _Container = "profilephotocontainer";

        public PhotoAccessor(IOptions<AzureSetting> config, IUserAccessor user)
        {
            _AzureSetting = config.Value;
            _User = user;
        }
        
        
        public async Task<PhotoUploadResult> UploadPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                var fileName = _User.GetUserName() + '_' + Guid.NewGuid().ToString();
                var container = new BlobContainerClient(_AzureSetting.ConnectionString, _Container); // Container name must be lowercase
                var createResponse = await container.CreateIfNotExistsAsync();
                if(createResponse != null && createResponse.GetRawResponse().Status == 201) 
                    await container.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

                var blob = container.GetBlobClient(fileName);
                await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

                using (var fileStream = file.OpenReadStream())
                {
                    var newImage = cropImage(fileStream, new Size(200, 200), true);
                    if (newImage == null)
                        throw new Exception("Crop Image failed.");

                    // Convert Image to Strem
                    using (var memoryStream = new MemoryStream())
                    {
                        newImage.Format = MagickFormat.Png;
                        newImage.Write(memoryStream);
                        memoryStream.Position = 0; // We need to reset the Position before we read the stream
                        await blob.UploadAsync(memoryStream, new BlobHttpHeaders { ContentType = file.ContentType });
                    }   

                }

                var res = new PhotoUploadResult
                {
                    Uri = blob.Uri.ToString(),
                    Name = fileName,
                    ContentType = file.ContentType,
                };

                return res;
            }

            return null;

        }

        public async Task<bool> DeletePhoto(string fileName)
        {
            BlobServiceClient blobServiceClient = new BlobServiceClient(_AzureSetting.ConnectionString);
            BlobContainerClient cont = blobServiceClient.GetBlobContainerClient(_Container);
            var deleted = cont.GetBlobClient(fileName).DeleteIfExists().Value;
            
            return deleted;
        }

        /// <summary>
        /// Resizing image before upload
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="size"></param>
        /// <param name="PreserveRatio"></param>
        /// <returns></returns>
        public MagickImage cropImage (Stream origin, Size size, bool PreserveRatio)
        {

            if (origin == null)
                return null;

            int newWidth, newHeight = 0;

            var _image = new MagickImage(origin);

            if (PreserveRatio)
            {
                float WidthRatio = (float)size.Width / _image.Width;
                float HeightRatio = (float)size.Height / _image.Height;
                float Ratio = WidthRatio > HeightRatio ? WidthRatio : HeightRatio;
                newWidth = (int)(_image.Width * Ratio);
                newHeight = (int)(_image.Height * Ratio);

            }
            else
            {
                newWidth = size.Width;
                newHeight = size.Height;
            }

            //// This only works on Windows
            //Image originalImage = Image.FromStream(origin);

            //if (PreserveRatio)
            //{
            //    float WidthRatio = (float)size.Width / originalImage.Width;
            //    float HeightRatio = (float)size.Height / originalImage.Height;
            //    float Ratio = WidthRatio > HeightRatio ? WidthRatio : HeightRatio;
            //    newWidth = (int)(originalImage.Width * Ratio);
            //    newHeight = (int)(originalImage.Height * Ratio);
            //}
            //else
            //{
            //    newWidth = size.Width;
            //    newHeight = size.Height;
            //}

            _image.Resize(newWidth, newHeight);

            //Image newImage = new Bitmap(originalImage, newWidth, newHeight);
            
            //// Keep the photo's quality as high quality
            //using (Graphics graphicsHandle = Graphics.FromImage(newImage))
            //{
            //    graphicsHandle.InterpolationMode = InterpolationMode.HighQualityBicubic;
            //    graphicsHandle.DrawImage(newImage, 0, 0, newWidth, newHeight);
            //}

            //FixRotate(newImage);

            return _image;

        }

        /// <summary>
        /// Fixing the image rotate problem after resize
        /// </summary>
        /// <param name="newImage"></param>
        /// <exception cref="NotImplementedException"></exception>
        private void FixRotate(Image newImage)
        {
            const int OrientationKey = 274; // Property tag : PropertyTagOrientation, https://learn.microsoft.com/en-us/dotnet/api/system.drawing.imaging.propertyitem.id?view=windowsdesktop-7.0
            const int NotSpecified = 0;
            const int NormalOrientation = 1;
            const int MirrorHorizontal = 2;
            const int UpsideDown = 3;
            const int MirrorVertical = 4;
            const int MirrorHorizontalAndRotateRight = 5;
            const int RotateLeft = 6;
            const int MirorHorizontalAndRotateLeft = 7;
            const int RotateRight = 8;

            // If it specified the orientation, then we need to check if the orientation has be flipped back
            if (newImage.PropertyIdList.Contains(OrientationKey))
            {
                var orientation = (int)newImage.GetPropertyItem(OrientationKey).Value[0];
                switch (orientation)
                {
                    case NotSpecified: // Assume it is good.
                    case NormalOrientation:
                        // No rotation required.
                        break;
                    case MirrorHorizontal:
                        newImage.RotateFlip(RotateFlipType.RotateNoneFlipX);
                        break;
                    case UpsideDown:
                        newImage.RotateFlip(RotateFlipType.Rotate180FlipNone);
                        break;
                    case MirrorVertical:
                        newImage.RotateFlip(RotateFlipType.Rotate180FlipX);
                        break;
                    case MirrorHorizontalAndRotateRight:
                        newImage.RotateFlip(RotateFlipType.Rotate90FlipX);
                        break;
                    case RotateLeft:
                        newImage.RotateFlip(RotateFlipType.Rotate90FlipNone);
                        break;
                    case MirorHorizontalAndRotateLeft:
                        newImage.RotateFlip(RotateFlipType.Rotate270FlipX);
                        break;
                    case RotateRight:
                        newImage.RotateFlip(RotateFlipType.Rotate270FlipNone);
                        break;
                    default:
                        throw new NotImplementedException("An orientation of " + orientation + " isn't implemented.");
                }


                throw new NotImplementedException();
            }
        }
    }
}
