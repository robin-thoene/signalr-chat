/**
 * Represents a single message.
 */
interface IMessage {
    /** The name of the sender. */
    senderName: string;
    /** The message content. */
    content: string;
}

export type { IMessage };
