'use strict';

var autoprefixer = require('autoprefixer');
var cheerio = require('cheerio');
var VERSION = require('../package.json').version;

var HtmlAutoprefixer = function() {
  this.version = VERSION;
  return this;
};

HtmlAutoprefixer.prototype.process = function(htmlString, cheerioOpts) {
  var $ = cheerio.load(htmlString, cheerioOpts);
  var styles = $('style').contents();
  var elementsWithStyleTag = $('[style]');
  var prefixed;

  styles.each(function(index, style) {
    var css = style.data;
    prefixed = autoprefixer.process(css).css;
    style.data = prefixed;
  });

  elementsWithStyleTag.each(function(index, element) {
    var css = '.tmp{' + element.attribs.style + '}';
    try {
      prefixed = autoprefixer.process(css).css;
      element.attribs.style = prefixed.replace('.tmp{', '').replace('}', '');
    } catch (e) {
      throw('Error parsing: element: ' + element.name + ' style: ' + element.attribs.style);
    }
  });

  return $.html();
};

module.exports = new HtmlAutoprefixer();
