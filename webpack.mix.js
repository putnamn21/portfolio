let mix = require('laravel-mix');
let path = require('path');
let config = require('./dev-server.config.json');
//let webpack = require('webpack');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  resolve: {
    alias: {
      Styles : path.resolve(__dirname, './resources/assets/sass/abstracts'),
      Images : path.resolve(__dirname, './resources/assets/images')
    }
  }
}).react('resources/assets/js/app.js', 'public/js')
  .extract(['babel-polyfill','react'])
  .sass('resources/assets/sass/app.scss', 'public/css');


if (mix.inProduction()) {
  mix.version();
}

mix.browserSync({
  proxy: config.proxy,
  ghostMode: false,
  open: false
});
