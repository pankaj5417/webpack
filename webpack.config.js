
const path = require("path");

module.exports = {
  entry: "./code/index.js",
  output: {
    path: path.join(__dirname, "build"), // Folder name
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },{
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

      {
        //
      },
    ],
  },
};
