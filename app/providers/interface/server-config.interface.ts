export interface ServerConfig {
  DATABASE: DataBaseConfig,
  JWT: JsonWebTokenConfig,
}

export interface DataBaseConfig {
  ATLAS_URI: string;
  LOCAL_URI: string;
}

export interface JsonWebTokenConfig {
  SECRET_KEY: string;
  PUBLIC_KEY: string;
  EXPIREDIN: string;
}