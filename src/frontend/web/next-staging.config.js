// Get the stage from the set environment.
const stage = process.env.NODE_ENVIRONMENT;

// Build the public runtime config to serve to clients.
const buildClientSideRuntimeConfig = () => {
    const config = {
        azureAdB2COptions: {
            callbackPath: '/signin-oidc',
            instance: '',
            domain: '',
            tenantId: '',
            signUpAndSignInFlow: 'B2C_1_SignUpAndSignIn',
            signUpFlow: 'B2C_1_SignUp',
            passwordResetFlow: 'B2C_1_PasswordReset',
            profileEditFlow: 'B2C_1_ProfileEdit',
            scopes: ['openid', 'profile'],
            clientId: '',
        },
        azureAdOptions: {
            callbackPath: '/signin-oidc',
            clientId: '',
            domain: '',
            instance: '',
            tenantId: '',
        },
        apiOptions: {
            baseUrl: '',
            scope: '',
        },
        uiOptions: {
            applicationInsightsKey: '',
        },
    };
    // Build the config for the stage.
    switch (stage) {
        case 'Production':
            // Set production config values.
            break;
        case 'Test':
            // Set test config values.
            break;
        case 'Integration':
            // Set integration config values.
            break;
        default:
            // Allow local dev apis.
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            // Set local development config values.
            config.apiOptions.baseUrl = 'http://localhost:3000/api/samples';
            break;
    }
    return config;
};

module.exports = {
    serverRuntimeConfig: {},
    publicRuntimeConfig: buildClientSideRuntimeConfig(),
};
