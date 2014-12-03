"use strict";

var
autoprefixer = require( "autoprefixer" ),
cheerio = require( "cheerio" ),
packageJson = require( "../package.json" );

var HtmlAutoprefixer = function( ) {     
  this.version = packageJson.version;
    
  return this;
};

HtmlAutoprefixer.prototype.process = function( htmlString ) {

  var 
  $ = cheerio.load( htmlString ),
  styles = $( "style" ).contents(),
  elementsWithStyleTag = $( "[style]" );

  styles.each( function( index, style ) {
    var 
    css = style.data,
    prefixed = autoprefixer.process( css ).css;

    style.data = prefixed;
  } );

  elementsWithStyleTag.each( function( index, element ) {
    var 
    css = ".tmp{" + element.attribs.style + "}",
    prefixed = autoprefixer.process( css ).css,
    prepared = prefixed.replace( ".tmp{", "").replace("}", "" );

    element.attribs.style = prepared;
  } );

  return {
    html: $.html()
  }
};

module.exports = new HtmlAutoprefixer( );
