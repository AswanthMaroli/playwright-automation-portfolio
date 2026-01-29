export type TestEnvironment = 'dev' | 'stage';

export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  users: {
    standard: {
      username: string;
      password: string;
    };
    lockedOut: {
      username: string;
      password: string;
    };
  };
}

const devConfig: EnvironmentConfig = {
  name: 'Development (Sauce Demo)',
  baseURL: 'https://www.saucedemo.com',
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
  },
};

const stageConfig: EnvironmentConfig = {
  name: 'Staging (Sauce Demo mirror)',
  baseURL: 'https://www.saucedemo.com',
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
  },
};

export function getTestEnvironment(): TestEnvironment {
  const env = (process.env.TEST_ENV || 'dev').toLowerCase() as TestEnvironment;
  if (env !== 'dev' && env !== 'stage') {
    // Fallback to dev for unknown values to keep behavior deterministic.
    return 'dev';
  }
  return env;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const env = getTestEnvironment();
  return env === 'stage' ? stageConfig : devConfig;
}

