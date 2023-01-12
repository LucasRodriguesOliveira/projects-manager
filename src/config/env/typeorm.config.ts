export interface TypeOrmConfig {
  host: string | undefined;
  port: number | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

export const typeOrmLoadEnv = (): { database: TypeOrmConfig } => {
  const {
    DATABASE_HOST: host,
    DATABASE_PORT: port,
    DATABASE_USER: username,
    DATABASE_PASSWORD: password,
    DATABASE_NAME: database,
  } = process.env;

  return {
    database: {
      host,
      port: parseInt(`${port}`, 10) || 5432,
      username,
      password,
      database,
    },
  };
};
