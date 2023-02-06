// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { serverRuntimeConfig, publicRuntimeConfig } = require('./next-staging.config');

module.exports = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    serverRuntimeConfig,
    publicRuntimeConfig,
    images: {
        domains: [],
    },
};
