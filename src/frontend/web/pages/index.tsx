import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import PrimaryButton from '../components/base/button/primaryButton';
import Input from '../components/base/inputs/input';
import { getClientConfig } from '../helper/configHelper';
import { IMessage } from '../types';

/** Generate a user id. */
const userId = v4();

/**
 * The page component to render at "/".
 *
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** The state of the hub connection. */
    const [connection, setConnection] = useState<HubConnection>();
    /** The messages to display. */
    const [messages, setMessages] = useState<IMessage[]>([]);
    /** The current user input. */
    const [userInput, setUserInput] = useState<string>('');

    /** Store the hub connection in state. */
    useEffect(() => {
        // Get the public client configuration.
        const config = getClientConfig();
        // Create the chat hub connection.
        const hubConnection = new HubConnectionBuilder().withUrl(config.chatHubUrl).build();
        setConnection(hubConnection);
    }, []);

    /** Handle connect and disconnect. */
    useEffect(() => {
        if (connection) {
            connection.start();
        }
        return () => {
            // Stop the connection.
            connection?.stop();
        };
    }, [connection]);

    // Register a handler for the "ReceiveMessage" event.
    connection?.on('ReceiveMessage', (senderName, message) => {
        const newMessages = [...messages];
        const newMessage: IMessage = {
            senderName: senderName,
            content: message,
        };
        newMessages.push(newMessage);
        setMessages([...newMessages]);
    });

    /**
     * Send a message to the server that everyone can receive.
     */
    const sendMessage = () => {
        connection?.invoke('BroadcastMessage', userId, userInput);
        setUserInput('');
    };

    return (
        <div className="flex flex-1 flex-col p-6">
            {messages.map((message, index) => (
                <div className={`chat ${message.senderName === userId ? 'chat-end' : 'chat-start'}`} key={`message-${index}`}>
                    <div className="chat-header">{message.senderName}</div>
                    <div className="chat-bubble chat-bubble-accent">{message.content}</div>
                </div>
            ))}
            <div className="mt-auto flex">
                <Input placeholder={t('chatControlPlaceholder')} value={userInput} onChange={(newValue) => setUserInput(newValue as string)} onEnter={sendMessage} />
                <div className="ml-6">
                    <PrimaryButton text={t('chatControlSend')} onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Home;
