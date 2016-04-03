'use strict';

var HTMLPostCSS = require('html-postcss');
var autoprefixer = require('autoprefixer');

module.exports = function(autoprefixerConfig) {
  return new HTMLPostCSS([autoprefixer(autoprefixerConfig)]);
};
