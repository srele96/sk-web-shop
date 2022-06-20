import {
  ENV,
  nodeEnvMustBeSpecifiedFailOtherwise,
  getFirebaseConfigProtectedFromVCS,
  preventConnectionWithMissingApiKeys,
  preventUnintendedConnections,
} from './environment';

function getMockedEnvAndDontDependOnEnvironmentFile() {
  return {
    [ENV.NEXT_PUBLIC_NODE_ENV]: 'foo-0',
    [ENV.NEXT_PUBLIC_API_KEY]: 'foo-1',
    [ENV.NEXT_PUBLIC_AUTH_DOMAIN]: 'foo-2',
    [ENV.NEXT_PUBLIC_PROJECT_ID]: 'foo-3',
    [ENV.NEXT_PUBLIC_STORAGE_BUCKET]: 'foo-4',
    [ENV.NEXT_PUBLIC_MESSAGING_SENDER_ID]: 'foo-5',
    [ENV.NEXT_PUBLIC_APP_ID]: 'foo-6',
  };
}

// https://www.webtips.dev/how-to-mock-processenv-in-jest
// DO NOT MODIFY THIS VALUE!!! OLD_ENV IS INITIAL .env CONFIGURATION
const ORIGINAL_DOTENV_CONFIGURATION = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...getMockedEnvAndDontDependOnEnvironmentFile() };
});

afterEach(() => {
  process.env = getMockedEnvAndDontDependOnEnvironmentFile();
});

afterAll(() => {
  process.env = ORIGINAL_DOTENV_CONFIGURATION;
});

describe('tests', () => {
  it(`should modify ${ENV.NEXT_PUBLIC_NODE_ENV}`, () => {
    process.env[ENV.NEXT_PUBLIC_NODE_ENV] = 'foo';
    expect(process.env[ENV.NEXT_PUBLIC_NODE_ENV]).toBe('foo');
  });

  it(`should have initial ${ENV.NEXT_PUBLIC_NODE_ENV} after modification`, () => {
    expect(process.env[ENV.NEXT_PUBLIC_NODE_ENV]).toBe('foo-0');
  });
});

describe('nodeEnvMustBeSpecifiedFailOtherwise', function () {
  it('throws if node environment is not "development"', () => {
    expect(() => nodeEnvMustBeSpecifiedFailOtherwise()).toThrow(
      'NODE_ENV must be "development" or "production"'
    );
  });

  it('throws if node environment is not "production"', () => {
    expect(() => nodeEnvMustBeSpecifiedFailOtherwise()).toThrow(
      'NODE_ENV must be "development" or "production"'
    );
  });

  it('does not throw if node environment is "development"', () => {
    process.env[ENV.NEXT_PUBLIC_NODE_ENV] = 'development';
    expect(() => nodeEnvMustBeSpecifiedFailOtherwise()).not.toThrow();
  });

  it('does not throw if node environment is "production"', () => {
    process.env[ENV.NEXT_PUBLIC_NODE_ENV] = 'production';
    expect(() => nodeEnvMustBeSpecifiedFailOtherwise()).not.toThrow();
  });
});

describe('getFirebaseConfigProtectedFromVCS', () => {
  it('reads correct values from dotenv file', () => {
    const firebaseConfig = {
      apiKey: process.env[ENV.NEXT_PUBLIC_API_KEY],
      authDomain: process.env[ENV.NEXT_PUBLIC_AUTH_DOMAIN],
      projectId: process.env[ENV.NEXT_PUBLIC_PROJECT_ID],
      storageBucket: process.env[ENV.NEXT_PUBLIC_STORAGE_BUCKET],
      messagingSenderId: process.env[ENV.NEXT_PUBLIC_MESSAGING_SENDER_ID],
      appId: process.env[ENV.NEXT_PUBLIC_APP_ID],
    };
    expect(getFirebaseConfigProtectedFromVCS()).toEqual(firebaseConfig);
  });
});

describe('preventConnectionWithMissingApiKeys', () => {
  it('throws if one of the api keys is missing', () => {
    process.env[ENV.NEXT_PUBLIC_API_KEY] = undefined;
    expect(() => preventConnectionWithMissingApiKeys()).toThrow(
      'Firebase keys must be specified'
    );
  });

  it('throws if all of the api keys are missing', () => {
    process.env[ENV.NEXT_PUBLIC_API_KEY] = undefined;
    process.env[ENV.NEXT_PUBLIC_AUTH_DOMAIN] = undefined;
    process.env[ENV.NEXT_PUBLIC_PROJECT_ID] = undefined;
    process.env[ENV.NEXT_PUBLIC_STORAGE_BUCKET] = undefined;
    process.env[ENV.NEXT_PUBLIC_MESSAGING_SENDER_ID] = undefined;
    process.env[ENV.NEXT_PUBLIC_APP_ID] = undefined;
    expect(() => preventConnectionWithMissingApiKeys()).toThrow(
      'Firebase keys must be specified'
    );
  });

  it('does not throw if all of the api keys are present', () => {
    expect(() => preventConnectionWithMissingApiKeys()).not.toThrow();
  });
});

describe('preventUnintendedConnections', () => {
  it('does not throw if required environment keys are specified', () => {
    process.env[ENV.NEXT_PUBLIC_NODE_ENV] = 'development';
    expect(() => preventUnintendedConnections()).not.toThrow();
  });

  it('throws one of the env variables is missing', () => {
    // prevents function from throwing
    process.env[ENV.NEXT_PUBLIC_NODE_ENV] = 'development';
    // causes function to throw
    process.env[ENV.NEXT_PUBLIC_API_KEY] = undefined;
    expect(() => preventUnintendedConnections()).toThrow();
  });
});
