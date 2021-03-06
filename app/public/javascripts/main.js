/**
 * Created by ManasB on 6/13/2015.
 */

require.config({
    paths: {
        backbone: "./libs/backbone-min",
        underscore: "./libs/underscore-min",
        jquery: "./libs/jquery-2.1.4.min",
        swig: "./libs/swig.min",
        bootstrap: "./libs/bootstrap.min",
        moment: "./libs/moment-with-locales.min",
        momentTimezone: "./libs/moment-timezone-with-data",
        datetimepicker: "./libs/bootstrap-datetimepicker.min",
        "jquery-easing": "./libs/jquery.easing.1.3.min",
        "marker-animate": "./libs/markerAnimate",
        slidingmarker: "./libs/SlidingMarker",
        text: "./libs/text"
    },
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepicker: {
            deps: ["jquery", "moment"]
        },
        "jquery-easing": {
            deps: ["jquery"]
        },
        "marker-animate": {
            deps: ["jquery-easing"]
        }
    }
});


/**
 * App entry point
 */

require([
    "router"
], function (App) {
    App.init();
});

