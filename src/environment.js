const ENV = {
  NEXT_PUBLIC_NODE_ENV: 'NEXT_PUBLIC_NODE_ENV',
  NEXT_PUBLIC_API_KEY: 'NEXT_PUBLIC_API_KEY',
  NEXT_PUBLIC_AUTH_DOMAIN: 'NEXT_PUBLIC_AUTH_DOMAIN',
  NEXT_PUBLIC_PROJECT_ID: 'NEXT_PUBLIC_PROJECT_ID',
  NEXT_PUBLIC_STORAGE_BUCKET: 'NEXT_PUBLIC_STORAGE_BUCKET',
  NEXT_PUBLIC_MESSAGING_SENDER_ID: 'NEXT_PUBLIC_MESSAGING_SENDER_ID',
  NEXT_PUBLIC_APP_ID: 'NEXT_PUBLIC_APP_ID',
};

/**
 * I don't want implicit connection to firebase when environment isn't
 * specified.
 *
 * Implicit connection to production firebase may cause unexpected
 * charges. I want to avoid that.
 */
function nodeEnvMustBeSpecifiedFailOtherwise() {
  const NODE_ENV = process.env[ENV.NEXT_PUBLIC_NODE_ENV];
  const productionEnvironmentSpecifiedDoNothing = NODE_ENV === 'production';
  if (NODE_ENV === 'development') {
    console.log('Running in development mode');
  } else if (productionEnvironmentSpecifiedDoNothing) {
  } else {
    throw new Error('NODE_ENV must be "development" or "production"');
  }
}

function getFirebaseConfigProtectedFromVCS() {
  return {
    apiKey: process.env[ENV.NEXT_PUBLIC_API_KEY],
    authDomain: process.env[ENV.NEXT_PUBLIC_AUTH_DOMAIN],
    projectId: process.env[ENV.NEXT_PUBLIC_PROJECT_ID],
    storageBucket: process.env[ENV.NEXT_PUBLIC_STORAGE_BUCKET],
    messagingSenderId: process.env[ENV.NEXT_PUBLIC_MESSAGING_SENDER_ID],
    appId: process.env[ENV.NEXT_PUBLIC_APP_ID],
  };
}

/**
 * If firebase keys are missing, the firebase will throw authentication error.
 *
 * Make the app explicitly fail.
 */
function preventConnectionWithMissingApiKeys() {
  const config = getFirebaseConfigProtectedFromVCS();

  // https://stackoverflow.com/questions/53164756/how-to-check-for-a-missing-variable-in-js#53164848
  if (
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.storageBucket &&
    config.messagingSenderId &&
    config.appId
  ) {
    console.log({ config });
  } else {
    throw new Error('Firebase keys must be specified');
  }
}

function preventUnintendedConnections() {
  nodeEnvMustBeSpecifiedFailOtherwise();
  preventConnectionWithMissingApiKeys();
}

export {
  ENV,
  nodeEnvMustBeSpecifiedFailOtherwise,
  getFirebaseConfigProtectedFromVCS,
  preventConnectionWithMissingApiKeys,
  preventUnintendedConnections,
};
