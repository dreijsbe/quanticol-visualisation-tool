/**
 * Created by ManasB on 6/13/2015.
 */

define([
    "backbone",
    "views/nav",
    "views/tool",
    "views/doc",
], function(Backbone, navView, toolView, docView){
    "use strict";

    var AppRouter = Backbone.Router.extend({
        routes: {
            "tool": "showTool",
            "doc": "showDoc",
            "*any": "defaultAction"
        },
        showTool: function () {
            // unbind scroll listener from window object, since it's only used in doc page, where it will
            // get bound again when the user visits it.
            $(window).unbind("scroll");

            toolView.render();
        },
        showDoc: function () {
            docView.render();
        },
        defaultAction: function () {
            this.navigate("#/tool");
        }
    });

    var init = function () {
        navView.render();

        var appRouter = new AppRouter();

        // delete route change event to nav view so that it can set the active tab
        appRouter.on("route", function () {

            navView.trigger("route", window.location.hash);
        });

        Backbone.history.start();
    };

    return {init: init};
});