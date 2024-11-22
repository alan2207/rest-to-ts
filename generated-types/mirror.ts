// Generated by rest-to-ts
// Generated at 2024-11-21T20:55:13.631Z
// Sources:
// - http://localhost:3000/mirror/123
// - http://localhost:3000/mirror/456?query=test
// - http://localhost:3000/mirror/789?query=test&page=1&limit=10

export type Mirror = {
    cookies?:     Cookies;
    headers:      Headers;
    id:           string;
    queryParams?: QueryParams;
}

export type Cookies = {
    sessionId?: string;
    token?:     string;
}

export type Headers = {
    accept:            string;
    "accept-encoding": string;
    "accept-language": string;
    connection:        string;
    cookie?:           string;
    host:              string;
    "sec-fetch-mode":  string;
    "user-agent":      string;
}

export type QueryParams = {
    limit?: string;
    page?:  string;
    query:  string;
}

