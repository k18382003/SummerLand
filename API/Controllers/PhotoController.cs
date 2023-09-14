using Application.Favorites;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController : BaseAPIController
    {
        [HttpPost]
        public async Task<IActionResult> Uplaod([FromForm] IFormFile File)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new Upload.Command { File = File }));
        }

        [HttpDelete("{fileName}")]
        public async Task<IActionResult> Delete(string fileName)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new Delete.Command  { fileName = fileName }));
        }

        [HttpPost("setmain/{photoId}")]
        public async Task<IActionResult> SetMain(string photoId)
        {
            return ResponseHandler(await Mediator.Send(new SetMain.Command { photoId = photoId }));
        }
    }
}
