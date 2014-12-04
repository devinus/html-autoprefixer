# html-autoprefixer

![html-autoprefixer](../master/html-autoprefixer.png?raw=true)

Autoprefix all CSS inside an html page - CSS inside style tags and inside style attributes.

[![BuildStatus](https://travis-ci.org/RebelMail/html-autoprefixer.png?branch=master)](https://travis-ci.org/motdotla/html-autoprefixer)
[![NPM version](https://badge.fury.io/js/html-autoprefixer.png)](http://badge.fury.io/js/html-autoprefixer)

```javascript
var prefixed = htmlAutoprefixer.process( htmlString ).html;
```

## Installation

```
npm install html-autoprefixer
```

## Usage

There is one command. It mirrors [autoprefixer-core](https://github.com/postcss/autoprefixer-core) API.

You pass an html string to `.process`, and then call `.html` to return the processed html.

```javascript
var 
htmlAutoprefixer = require( "html-autoprefixer" ),
htmlString = "<html><head><style>:fullscreen a { transition: transform 1s; }</style></head><body><h1 style='font-feature-settings: \"liga\", \"dlig\";'>Hello</h1></body></html>";

var prefixed = autoprefixer.process( htmlString ).html;
```

### Gulp

[![](https://raw.githubusercontent.com/RebelMail/gulp-html-autoprefixer/master/gulp-html-autoprefixer.png)](https://github.com/RebelMail/gulp-html-autoprefixer)

Using [Gulp](http://gulpjs.com)? Use [gulp-html-autoprefixer](https://github.com/RebelMail/gulp-html-autoprefixer).

```javascript
var gulp = require( "gulp" );
var htmlAutoprefixer = require( "gulp-html-autoprefixer" );

gulp.task( "html-autoprefix", function( ) {
  return gulp.src( "./path/to/index-or-other.html" )
    .pipe( htmlAutoprefixer( ) )
    .pipe( gulp.dest( "dist" ) );
} );
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Running tests

```
npm install
npm test
```
