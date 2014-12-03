var 
assert = require( "assert" ),
htmlAutoprefixer = require( "../lib/main" ),
should = require( "should" );

var result;

describe( "html-autoprefixer", function( ) {
  before( function( ) {
    result = htmlAutoprefixer;
  } );

  it( "version should be set", function( ) {
    result.version.should.eql( "0.0.1" ); 
  } );

  describe( ".prcocess( ).html", function( ) {
    it( "autoprefixes inside of style tags", function( ) {
      var htmlString = "<html><style>:fullscreen a { transition: transform 1s; }</style></html>";
      var prefixedResult = "<html><style>:-webkit-full-screen a { -webkit-transition: -webkit-transform 1s; transition: transform 1s; }:-moz-full-screen a { transition: transform 1s; }:-ms-fullscreen a { transition: transform 1s; }:fullscreen a { -webkit-transition: -webkit-transform 1s; transition: transform 1s; }</style></html>";

      var prefixed = htmlAutoprefixer.process( htmlString ).html;

      prefixed.should.eql( prefixedResult );
    } );

    it( "autoprefixes inside of style attributes", function( ) {
      var htmlString = "<html><h1 style='transition: transform 1s'>Hello</h1></html>";
      var prefixedResult = "<html><h1 style=\"-webkit-transition: -webkit-transform 1s;transition: transform 1s\">Hello</h1></html>";

      var prefixed = htmlAutoprefixer.process( htmlString ).html;

      prefixed.should.eql( prefixedResult );
    } );

  } );

} );
