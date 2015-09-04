'use strict';

var HTMLPostCSS = require('html-postcss');
var autoprefixer = require('autoprefixer');

module.exports = new HTMLPostCSS([autoprefixer]);
