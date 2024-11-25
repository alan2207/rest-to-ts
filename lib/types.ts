type EndpointVariation = {
  url: string;
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
};

export type EndpointConfig = {
  variations: EndpointVariation[];
  outputPath: string;
  rootName: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type ConfigWithAuth = {
  credentials: Credentials;
  config: EndpointConfig[];
};
