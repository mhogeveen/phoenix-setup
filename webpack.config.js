import path from "path";
import { fileURLToPath } from "url";

import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------
// Configuration: Entries
// ----------------------------
const entry = {
  "phoenix": path.resolve(__dirname, "src/main.js"),
};

// ----------------------------
// Configuration: Output
// ----------------------------
const output = {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
  clean: true,
};

// ----------------------------
// Configuration: Modules
// ----------------------------
const module = {};

// ----------------------------
// Configuration: Plugins
// ----------------------------
const plugins = [];

// ----------------------------
// Configuration: Devtool
// ----------------------------
const devtool = false;

// ----------------------------
// Configuration: Optimization
// ----------------------------
const optimization = {
  minimizer: [
    new TerserPlugin({
      minify: TerserPlugin.swcMinify,
    }),
  ],
};

// ----------------------------
// Configuration: Watch Options
// ----------------------------
const watchOptions = {
  aggregateTimeout: 500,
  ignored: "/node_modules/",
};

// ----------------------------
// Configuration: Mode
// ----------------------------
const mode = "production";

const config = {
  entry,
  output,
  module,
  // plugins,
  // devtool,
  optimization,
  watchOptions,
  mode,
};

export default config;
