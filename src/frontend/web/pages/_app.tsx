import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import BasicLayout from '../components/base/layout/basicLayout';
/**
 * Part of the custom HTML Head
 * @returns {ReactElement} Part of the application Head
 */
const CustomHead: FunctionComponent = (): ReactElement => {
    return (
        <Head>
            <title>signalr-chat</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    );
};
/**
 * The main entry point of the next js application.
 * @param {AppProps} param0 The properties of the app component.
 * @returns {ReactElement} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): ReactElement => {
    return (
        <>
            <CustomHead />
            <BasicLayout>
                <Component {...pageProps} />
            </BasicLayout>
        </>
    );
};

export default appWithTranslation(App);
