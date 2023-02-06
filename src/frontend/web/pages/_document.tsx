import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

/**
 * Framework file by NextJS https://nextjs.org/docs/advanced-features/custom-document
 *
 * @returns {Element} Document outline
 */
export default function Document(): JSX.Element {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="This is the templated NextJS app for the project timewaste-trackerTmp." />
                <meta property="og:title" content="timewaste-trackerTmp" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
