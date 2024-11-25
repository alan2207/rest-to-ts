import type { EndpointConfig } from "./types";

export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export function mergeConfigs(configs: EndpointConfig[]) {
  const mergedMap = configs.reduce<Record<string, EndpointConfig>>(
    (merged, current) => {
      const key = `${current.outputPath}|${current.rootName}`;

      if (merged[key]) {
        merged[key].variations = [
          ...merged[key].variations,
          ...current.variations,
        ].filter(
          (variation, index, self) =>
            index ===
            self.findIndex(
              (v) =>
                v.url === variation.url &&
                JSON.stringify(v.headers) ===
                  JSON.stringify(variation.headers) &&
                JSON.stringify(v.cookies) === JSON.stringify(variation.cookies)
            )
        );
      } else {
        merged[key] = { ...current };
      }

      return merged;
    },
    {}
  );

  return Object.values(mergedMap);
}
