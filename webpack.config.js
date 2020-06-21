const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@common_components": path.resolve(__dirname, "src/common_components"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@routines": path.resolve(__dirname, "src/routines"),
      "@sagas": path.resolve(__dirname, "src/sagas"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
