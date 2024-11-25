import { mergeConfigs } from "./helpers";
import type { ConfigWithAuth, Credentials, EndpointConfig } from "./types";

const LOGIN_URL = "http://localhost:3000/login";

export async function getAuthToken({ email, password }: Credentials) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data.token as string;
}

async function applyAuthToConfig(
  token: string,
  config: EndpointConfig[]
): Promise<EndpointConfig[]> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const cookies = {
    token,
  };

  return config.map((endpoint) => ({
    ...endpoint,
    variations: endpoint.variations.map((variation) => ({
      ...variation,
      headers: { ...variation.headers, ...headers },
      cookies: { ...variation.cookies, ...cookies },
    })),
  }));
}

export async function getConfigsWithAuth(configs: ConfigWithAuth[]) {
  const configArrays = await Promise.all(
    configs.map(async ({ credentials, config }) => {
      const token = await getAuthToken(credentials);
      return applyAuthToConfig(token, config);
    })
  );

  return mergeConfigs(configArrays.flat());
}
