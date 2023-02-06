namespace backend.Hubs
{
    using Interfaces;

    using Microsoft.AspNetCore.SignalR;

    /// <summary>
    /// Chat hub.
    /// </summary>
    public class ChatHub : Hub<IChatHub>
    {
        #region methods

        /// <summary>
        /// Broadcast a message to all clients.
        /// </summary>
        /// <param name="senderName">The name of the client that sends the message.</param>
        /// <param name="message">The message content.</param>
        public async Task BroadcastMessage(string senderName, string message)
        {
            await Clients.All.ReceiveMessage(senderName, message);
        }

        #endregion
    }
}