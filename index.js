/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require( 'broccoli-funnel' );
var mergeTrees = require( 'broccoli-merge-trees' );

module.exports = {
  name: 'ember-calendar',
  isDevelopingAddon: function(){
    return true;
  },
  included: function(app) {
    this._super.included(app);

    var options = app.options.emberCalendar || {};

    if (!('includeFontAwesomeAssets' in options)) {
      options.includeFontAwesomeAssets = true;
    }

    app.import(path.join(app.bowerDirectory, 'lodash/lodash.js'));
    app.import(path.join(app.bowerDirectory, 'interact/interact.js'));

    if (options.includeFontAwesomeAssets) {
      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.ttf'), {
        destDir: 'assets/fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff'), {
        destDir: 'assets/fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff2'), {
        destDir: 'assets/fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.svg'), {
        destDir: 'assets/fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.eot'), {
        destDir: 'assets/fonts'
      });
    }

    app.import('vendor/ember-calendar/lodash.js', {
      type: 'vendor',
      exports: { 'lodash': ['default'] }
    });

    app.import('vendor/ember-calendar/jstz.js', {
      type: 'vendor',
      exports: { 'jstz': ['default'] }
    });

    app.import('vendor/ember-calendar/interact.js', {
      type: 'vendor',
      exports: { 'interact': ['default'] }
    });

    app.import('vendor/jstz.js', {
      type: 'vendor'
    });

    if (app.env === 'test') {
      app.import(path.join(app.bowerDirectory, 'jquery-simulate/jquery.simulate.js'), {
        type: 'test'
      });
    }
  },
  treeForStyles: function(stylesTree) {
    var fontAwesomePath = path.join(this.app.bowerDirectory, '/fontawesome');
    var fontAwesomeTree = new Funnel(this.treeGenerator(fontAwesomePath), {
      srcDir: '/scss',
      destDir: '/app/styles/addons/ember-calendar/fontawesome'
    });

    return mergeTrees(
      [
        stylesTree,
        fontAwesomeTree
      ],
      {
        overwrite: true
      }
    );
  }
};
