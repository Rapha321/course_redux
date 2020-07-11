const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; //this is important for babel plug-in so that it knows we are running in development mode

// Webpack: Core Config Settings
// to configure webpack, we export a javascript object
module.exports = {
  mode: "development", // this set the node environment to development and disable some production only features
  target: "web",
  devtool: "cheap-module-source-map", // this one is generally recommended for development so that we get a source map for debugging.
  entry: "./src/index",

  // We can declare where we want webpack to output. Now this is a little bit strange because webpack doesn't output code in development mode.
  // It merely puts it in memory. However, we do have to declare these paths so that it knows where it's serving from memory.
  output: {
    path: path.resolve(__dirname, "build"), // use the __dirname variable that gives us our current directory name and then say build right here.
    publicPath: "/", // This setting specifies the public URL of the output directory when it's referenced in the browser
    filename: "bundle.js", // a physical file won't be generated for development, but webpack requires this value so that our HTML can reference the bundle that's being served from memory.
  },

  //   Webpack: Dev Server
  devServer: {
    stats: "minimal", // This reduces the information that it writes to the command line so that we don't get a lot of noise when it's running.
    overlay: true, // This tells it to overlay any errors that occur in the browser
    historyApiFallback: true, // This means that all requests will be sent to index.html. This way we can load deep links and they'll all be handled by React Router.
    // These last three lines are necessary due to an open issue in webpack when using the latest version of Chrome. Once it's resolved, we should be able to remove these:
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },

  //   Webpack: Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],

  //   Webpack: Loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // we tell it how to find our javascript files
        exclude: /node_modules/, // tell it to ignore node_modules since we don't need it to process any files in node_modules.
        use: ["babel-loader", "eslint-loader"], //we can use the use property to tell webpack what to do with these JavaScript files
      },

      // have weppack process our css
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], // This will allow us to import CSS just like we do JavaScript, and webpack will bundle all of our CSS into a single file
      },
    ],
  },
};
