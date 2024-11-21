# REST to TS

A proof of concept of generating TypeScript types from REST API endpoints.

## How it works

It uses [quicktype](https://github.com/glideapps/quicktype) to generate the types.

It reads the configuration from the `src/config.ts` file and generates the types for each endpoint.

## Why?

Sometimes you have a REST API that doesn't have OpenAPI spec, but you still want to generate types for it. This is a quick way to do it.

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

Configuration is done in the `src/config.ts` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
