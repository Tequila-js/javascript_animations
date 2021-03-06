import path from 'path';
import webpack from 'webpack';

function config (env = 'development') {
  let [configWebpack, plugins] = [{}, [new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')]];

  if (env === 'production') {
    let webpackEnv, uglify;

    webpackEnv = new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    });

    uglify = new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        drop_console: true,
        warnings: false
      }
    });

    plugins.push(webpackEnv, uglify);
  }

  configWebpack = {
    entry: {
      main: path.join(process.cwd(), '/app/js/main.js'),
      workshop: path.join(process.cwd(), '/app/js/workshop.js'),
      ['demo-01']: path.join(process.cwd(), '/app/js/demo_01.js'),
      ['demo-02']: path.join(process.cwd(), '/app/js/demo-02.js'),
      ['demo-03']: path.join(process.cwd(), '/app/js/demo_03.js')
    },
    output: {
      path: path.join(process.cwd(), env === 'development' ? '/dist/js' : '/docs/js'),
      filename: '[name].js'
    },
    devtool: env === 'production' ? 'cheap-source-map' : 'source-map',
    plugins,
    module: {
      loaders: [{
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }, {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      }]
    },
    resolve: {
      extensions: ['.js', '']
    }
  };

  return configWebpack;
}

export default config;
