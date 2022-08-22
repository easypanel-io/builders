import { createBuilder } from "~builders-utils";

import Dockerfile from "./Dockerfile.ejs";

/**
 * This builder was adapted from the official Next.js Dockerfile
 * https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
 */

export default createBuilder({
  name: "Next.js",
  schema: {
    type: "object",
    required: ["disableTelemetry"],
    properties: {
      disableTelemetry: {
        type: "boolean",
        title: "Disable Telemetry",
        default: false,
      },
    },
  } as const,
  generate(data) {
    return [{ name: "Dockerfile", content: Dockerfile(data) }];
  },
});
