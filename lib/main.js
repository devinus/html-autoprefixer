'use strict';

var cheerio = require('cheerio');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var HTMLPostCSS = require('html-postcss');

module.exports = new HTMLPostCSS([autoprefixer]);
