using Application.Interface;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace Infrustructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _HttpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _HttpContextAccessor = httpContextAccessor;
        }


        public string GetUserName()
        {
            return _HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }

        public string GetUserEmail()
        {
            return _HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
        }

        public string GetUserID()
        {
            return _HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
