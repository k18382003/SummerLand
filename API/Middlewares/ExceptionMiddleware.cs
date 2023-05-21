using Application.Core;
using Microsoft.AspNetCore.Connections;
using System.Linq.Expressions;
using System.Net;
using System.Text.Json;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, 
            IHostEnvironment env)
        {
            this._next = next;
            this._logger = logger;
            this._env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                // if we are not in API controller, we need to specify the content type ad StatusCode
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // 500

                // checking our running environment
                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                // if we are not in API controller, we need to specify JSON serialize options
                var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                // convert response to a json string
                var json = JsonSerializer.Serialize(response, option);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
