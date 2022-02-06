import path from "path";
import { fileURLToPath } from "url";

import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  // ----------------------------
  // Configuration: Entries
  // ----------------------------
  const entry = {
    phoenix: path.resolve(__dirname, "src/main.js"),
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
  // Configuration: Mode Options
  // ----------------------------
  const mode = env.mode;

  // ----------------------------
  // Configuration: Resolve Options
  // ----------------------------
  const resolve = {
    extensions: [".js"],
  };

  const config = {
    entry,
    output,
    optimization,
    watchOptions,
    mode,
    resolve,
  };

  return config;
};
