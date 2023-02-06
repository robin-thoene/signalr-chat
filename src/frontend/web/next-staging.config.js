// Get the stage from the set environment.
const stage = process.env.NODE_ENVIRONMENT;

// Build the public runtime config to serve to clients.
const buildClientSideRuntimeConfig = () => {
    const config = {
        chatHubUrl: '',
    };
    // Build the config for the stage.
    switch (stage) {
        case 'Production':
            // Set production config values.
            config.chatHubUrl = process.env.CHAT_HUB_URL;
            break;
        default:
            // Allow local dev apis.
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            // Set local development config values.
            config.chatHubUrl = 'https://localhost:7052/chatHub';
            break;
    }
    return config;
};

module.exports = {
    serverRuntimeConfig: {},
    publicRuntimeConfig: buildClientSideRuntimeConfig(),
};
