# REST to TS

A proof of concept of generating TypeScript types from REST API endpoints.

## How it works

A configuration is provided in the `lib/config.ts` file with the endpoints you want to generate types for.

The script will call each endpoint with the provided variations and extract the types from the responses.

It uses [quicktype](https://github.com/glideapps/quicktype) to generate the types.

## Why?

Sometimes you have a REST API that doesn't have OpenAPI spec or it is difficult to get one, but you still want to generate types for it. This is a quick way to do it.

## Usage

```bash
# Install dependencies
npm install

# Start the API
npm run start-api

# Generate the types
npm run generate-types
```

## Configuration

Configuration is provided in the `lib/config.ts` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
