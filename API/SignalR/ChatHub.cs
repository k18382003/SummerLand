using Application.Comments;
using Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _Mediator;

        public ChatHub(IMediator mediator)
        {
            _Mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _Mediator.Send(command);

            // Send the comment to every person who is connected to the Hub
            await Clients.Group(command.ArtId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        // When a client connect to the Hub, we want them to join a group
        public override async Task OnConnectedAsync()
        {
            // We don't have a route. So, we need to get article id from our query
            var httpContext = Context.GetHttpContext();
            var articleId = httpContext.Request.Query["artId"];

            //Add connected client to the Group
            //We don't have to diconnect, because SignalR will do it automatically
            //when a client disconnect the group
            await Groups.AddToGroupAsync(Context.ConnectionId, articleId);

            //And then we can send the comment to the client
            var result = await _Mediator.Send(new List.Query { ArtID = Guid.Parse(articleId) });

            await Clients.Caller.SendAsync("LoadComments", result.Value);


        }

    }
}
