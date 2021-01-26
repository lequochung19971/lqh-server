export interface ServerConfig {
  DATABASE: DataBaseConfig,
  JWT: JsonWebTokenConfig,
}

export interface DataBaseConfig {
  URI: string;
}

export interface JsonWebTokenConfig {
  SECRET_KEY: string;
  PUBLIC_KEY: string;
  EXPIREDIN: string;
}