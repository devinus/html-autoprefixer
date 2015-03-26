'use strict';

var htmlAutoprefixer = require('../lib/main');
var should = require('should');

describe('html-autoprefixer', function() {
  describe('#process', function() {
    it( 'autoprefixes inside of style tags', function( ) {
      var htmlString = '<html><style>:fullscreen a { transition: transform 1s; }</style></html>';
      var prefixedResult = '<html><style>:-webkit-full-screen a { -webkit-transition: -webkit-transform 1s; transition: transform 1s; }\n:-moz-full-screen a { transition: transform 1s; }\n:-ms-fullscreen a { transition: transform 1s; }\n:fullscreen a { -webkit-transition: -webkit-transform 1s; transition: transform 1s; }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);
      prefixed.should.eql(prefixedResult);
    });

    it( 'autoprefixes nested elements inside of style tags', function( ) {
      var htmlString = '<html><style>@media screen and (max-width: 600px){ .class{ transition: transform 1s; } }</style></html>';
      var prefixedResult = '<html><style>@media screen and (max-width: 600px){ .class{ -webkit-transition: -webkit-transform 1s; transition: transform 1s; } }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);

      prefixed.should.eql(prefixedResult);
    });

    it( 'autoprefixes nested elements of when doing SVG hack', function( ) {
      var htmlString = '<html><style>@media screen{ @media screen{ .svg{ transition: transform 1s; } } }</style></html>';
      var prefixedResult = '<html><style>@media screen{ @media screen{ .svg{ -webkit-transition: -webkit-transform 1s; transition: transform 1s; } } }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);

      prefixed.should.eql(prefixedResult);
    });

    it('autoprefixes inside of style attributes', function() {
      var htmlString = '<html><h1 style="transition: transform 1s">Hello</h1></html>';
      var prefixedResult = '<html><h1 style="-webkit-transition: -webkit-transform 1s;transition: transform 1s">Hello</h1></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);

      prefixed.should.eql(prefixedResult);
    });

  });

});
