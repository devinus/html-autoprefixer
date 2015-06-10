'use strict';

var cheerio = require('cheerio');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

var VERSION = require('../package.json').version;

var HTMLAutoprefixer = function() {
  this.version = VERSION;
  this.re = /#tmp\d+{(.+?)}/g;
  return this;
};

HTMLAutoprefixer.prototype.process = function(htmlString, cheerioOpts, autoprefixerOpts) {
  var $ = cheerio.load(htmlString, cheerioOpts);
  var styles = $('style').contents();
  var elementsWithStyleAttr = $('[style]');
  var prefixed;

  styles.each(function(index, style) {
    prefixed = postcss([autoprefixer]).process(style.data, autoprefixerOpts).css;
    style.data = prefixed;
  });

  if (elementsWithStyleAttr.length > 0) {
    var tmp = '';
    elementsWithStyleAttr.each(function(index, element) {
      tmp += '#tmp' + index + '{' + element.attribs.style + '}';
    });

    prefixed = postcss([autoprefixer]).process(tmp, autoprefixerOpts).css;

    var re = this.re;
    elementsWithStyleAttr.each(function(index, element) {
      var match = re.exec(prefixed);
      element.attribs.style = match[1];
    });

    this.re.lastIndex = 0;
  }

  return $.html();
};

module.exports = new HTMLAutoprefixer();
