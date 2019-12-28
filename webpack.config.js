const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('config');
const WebpackBar = require('webpackbar');
const { exec } = require('child_process');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = !isDevelopment;
const shouldAnalizeBundle = !!process.env.ANALIZE_BUNDLE;
const PROJECT_PATH = config.get('PROJECT_PATH');

function evalBundleAnalyzerInclusion() {
  return shouldAnalizeBundle ? new BundleAnalyzerPlugin() : null;
}

function defineGlobalVariables() {
  return new webpack.DefinePlugin({
    ___APP_BASENAME___: JSON.stringify(config.app.base),
    ___TIMEOUT___: JSON.stringify(config.get('rest.timeout')),
    ___IS_DEVELOPMENT___: JSON.stringify(isDevelopment),
  });
}

function evalHotModuleInclusion() {
  return isDevelopment && new webpack.HotModuleReplacementPlugin();
}

function useCssModules(value) {
  return [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: value,
        camelCase: true,
        namedExport: true,
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    'sass-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [autoprefixer],
      },
    },
  ];
}

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isDevelopment ? 'eval-source-map' : false,
  entry: {
    app: [
      isDevelopment && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      `${__dirname}/web/index.tsx`,
    ].filter(Boolean),
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: isProduction ? '/stem/statics/' : '/',
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: isDevelopment,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', 'scss', 'css'],
    alias: {
      '@components': path.resolve(__dirname, 'web/components/'),
      '@services': path.resolve(__dirname, 'web/services/'),
      '@translations': path.resolve(__dirname, 'web/translations/'),
      '@utils': path.resolve(__dirname, 'web/utils/'),
      '@contextApi': path.resolve(__dirname, 'web/contextApi/'),
      '@models': path.resolve(__dirname, 'web/models/'),
      '@constants': path.resolve(__dirname, 'web/constants/'),
      '@views': path.resolve(__dirname, 'web/views/'),
    },
  },
  module: {
    rules: [
      {
        test: /quill.*\.css$/,
        use: useCssModules(false),
      },
      {
        test: /\.css$|.scss$/,
        exclude: /quill.*\.css$/,
        use: useCssModules(true),
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [path.resolve(PROJECT_PATH, './server'), path.resolve(PROJECT_PATH, './node_modules')],
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      },
    ],
  },
  plugins: [
    defineGlobalVariables(),
    evalHotModuleInclusion(),
    evalBundleAnalyzerInclusion(),
    new CopyWebpackPlugin([
      {
        from: 'web/assets',
        to: 'assets',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? 'style.css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? 'style.css' : '[name].[contenthash].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|pt/),
    new WebpackBar(),
    new webpack.HashedModuleIdsPlugin(),
    new StatsWriterPlugin({
      stats: {
        assets: true,
      },
    }),
  ].filter(Boolean), // remove empty values
};

const env = isDevelopment ? 'development' : 'production';
console.info(`\n---> Starting with "${env}" config... \n`);

exec(`rm -rf ${__dirname}/dist`, () => {
  console.log('\n---> "dist" folder clean!\n');
});

module.exports = webpackConfig;
