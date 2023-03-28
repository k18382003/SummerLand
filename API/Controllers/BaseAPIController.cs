using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
        // Becuase we do multiple controllers are sharing _mediator, we should put it in the base class
        private IMediator _mediator;

        // we only need to get a new mediator when we don't have one.(This syntax only work for C# 6)
        protected IMediator Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();

        // eaquals following code
        //protected IMediator Mediator { 
        //    get { return _mediator ??= HttpContext.RequestServices.GetService<IMediator>(); }
        //}

    }
}
