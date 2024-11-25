import { getConfigsWithAuth } from "../lib/auth";
import { MIRROR_CONFIG, USER1_CONFIG, USER2_CONFIG } from "../lib/config";
import { generateAllTypes } from "../lib/generate-types";
import { mergeConfigs } from "../lib/helpers";

getConfigsWithAuth([USER1_CONFIG, USER2_CONFIG])
  .then((authConfigs) => mergeConfigs(authConfigs.concat(MIRROR_CONFIG)))
  .then((allConfigs) =>
    generateAllTypes({ config: allConfigs, chunkSize: 10 })
  );
