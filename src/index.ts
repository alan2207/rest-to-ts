import { getConfigsWithAuth } from "../lib/auth";
import { MIRROR_CONFIG, getUser1Config, USER2_CONFIG } from "./config";
import { generateAllTypes } from "../lib/generate-types";
import { mergeConfigs } from "../lib/helpers";

getUser1Config()
  .then((user1Config) => getConfigsWithAuth([user1Config, USER2_CONFIG]))
  .then((authConfigs) => mergeConfigs(authConfigs.concat(MIRROR_CONFIG)))
  .then((allConfigs) =>
    generateAllTypes({ config: allConfigs, chunkSize: 10 })
  );
