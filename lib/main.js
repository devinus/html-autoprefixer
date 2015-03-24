'use strict';

var autoprefixer = require('autoprefixer');
var cheerio = require('cheerio');
var VERSION = require('../package.json').version;

var HtmlAutoprefixer = function( ) {
  this.version = VERSION;

  return this;
};

HtmlAutoprefixer.prototype.process = function(htmlString) {

  var $ = cheerio.load(htmlString);
  var styles = $('style').contents();
  var elementsWithStyleTag = $('[style]');
  var prefixed;

  styles.each(function(index, style) {
    var css = style.data;
    prefixed = autoprefixer.process(css).css;
    style.data = prefixed;
  });

  elementsWithStyleTag.each( function( index, element ) {
    var css = '.tmp{' + element.attribs.style + '}';
    prefixed = autoprefixer.process(css).css,
    element.attribs.style = prefixed.replace('.tmp{', '').replace('}', '');
  });

  return {
    html: $.html()
  };
};

module.exports = new HtmlAutoprefixer();
