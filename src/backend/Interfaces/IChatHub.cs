namespace backend.Interfaces
{
    /// <summary>
    /// Must be implemented by all chat hubs.
    /// </summary>
    public interface IChatHub
    {
        #region methods

        /// <summary>
        /// Receive a message send by another client.
        /// </summary>
        /// <param name="senderName">The name of the client that sent the message.</param>
        /// <param name="message">The message content.</param>
        Task ReceiveMessage(string senderName, string message);

        #endregion
    }
}