﻿using API.Extentions;
using Application.Core;
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

        /// <summary>
        /// Handle the HTTP request result
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        protected ActionResult ResponseHandler<T>(Response<T> response)
        {
            if (response == null) return NotFound();
            if (response.IsSuccess && response.Value != null)
                return Ok(response.Value);
            else if (response.IsSuccess && response.Value == null)
                return NotFound();
            else
                return BadRequest(response.ErrorMsg);
        }

        /// <summary>
        /// Handle the HTTP request result
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        protected ActionResult ResponsePageHeaderHandler<T>(Response<PagedList<T>> response)
        {
            if (response == null) return NotFound();
            if (response.IsSuccess && response.Value != null)
            {
                Response.AddPaginationHeader(response.Value.CurrentPage, response.Value.TotalPage
                    ,response.Value.PageSize, response.Value.TotalCount);
                return Ok(response.Value);
            }
            else if (response.IsSuccess && response.Value == null)
                return NotFound();
            else
                return BadRequest(response.ErrorMsg);
        }
    }
}
