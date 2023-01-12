export interface AppConfig {
  host: string;
  port: number;
}

export const appLoadEnv = (): { app: AppConfig } => ({
  app: {
    host: process.env.HOST || 'localhost',
    port: parseInt(`${process.env.PORT}`, 10) || 3000,
  },
});
