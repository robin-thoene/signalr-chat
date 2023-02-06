import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import PrimaryButton from '../components/base/button/primaryButton';
import { getClientConfig } from '../helper/configHelper';

/**
 * The page component to render at "/".
 *
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    const [connection, setConnection] = useState<HubConnection>();
    /** The messages to display. */
    const [messages, setMessages] = useState<string[]>([]);

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
        newMessages.push(`${senderName}: ${message}`);
        setMessages([...newMessages]);
    });

    return (
        <div>
            {messages.map((message, index) => (
                <div key={`message-${index}`}>{message}</div>
            ))}
            <PrimaryButton text="Send" onClick={() => connection?.invoke('BroadcastMessage', 'me', 'hellow')} />
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
