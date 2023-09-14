using System;
using System.Security.Claims;

namespace Application.Interface
{
    public interface IUserAccessor
    {
        string GetUserName();
        string GetUserEmail();
        string GetUserID();
    }
}
