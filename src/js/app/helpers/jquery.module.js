/* ========================================
 * CORS Planner - jQuery Module
 *
 * jQuery plugin for Module Interactions
 *
 * Author: Wang Zhuochun
 * Last Edit: 17/Nov/2012 11:04 PM
 * ========================================
 * <License>
 * ======================================== */

define(function(require, exports) {

    "use strict";
    /*jshint jquery:true, laxcomma:true, browser:true, maxerr:50*/

    (function($) {

        var _project = "planner_"
          , _pluginName = "modules"
          , $grid = $("#tt-grid")
        // Plugin constructor
          , Plugin = function(element, options) {
            this.$elem = $(element);
            this.init(options);
          };

        Plugin.prototype = {
            constructor: Plugin

            , init: function(opt) {
                this.$method = this.$elem.find(".method");
                this.$info = this.$elem.find(".info");

                // module data
                this.data = opt.data;
                // attach events
                this.attachEvents();
                // resize
                this.resize();
            }

            , get: function(key) {
                return this.data.get(key);
            }

            , resize: function() {
                var pivotItems = $("#metro-pivot").find(".pivotItem");
                // width
                this.$info.width(pivotItems.width() - 43);
            }

            , attachEvents: function(item, fun) {
                var self = this;

                // elem events
                this.$elem.on("mouseenter", function() {
                    $grid.find(".slot[id^=" + self.get("code") + "-]").addClass("hover");
                });

                this.$elem.on("mouseleave", function() {
                    $grid.find(".slot[id^=" + self.get("code") + "-]").removeClass("hover");
                });

                // debug info
                this.$elem.on("dblclick", function() {
                    if (window.console)
                        window.console.log(self.data);
                });

                // method events
                this.$method.on("click", ".detail", function() {
                    $.publish("module:preview", self.get("code"));
                    // switch to detail panel
                    $("#metro-pivot").data("controller").goToItemByName("Detail");
                });

                this.$method.on("click", ".timetable", function() {
                    var $this = $(this).find("i");

                    if ($this.hasClass("icon-eye-open")) {
                        // remove slots on timetable
                        $this.removeClass("icon-eye-open").addClass("icon-eye-close");
                        // mark the slot inactive
                        self.$elem.addClass("inactive");
                    } else {
                        // add slots to timetable
                        $this.removeClass("icon-eye-close").addClass("icon-eye-open");
                        // remove the inactive
                        self.$elem.removeClass("inactive");
                    }
                });

                this.$method.on("click", ".remove", function() {
                    // hide tooltip
                    $(this).tooltip("destroy");
                    // remove all the slots from timetable
                    $("#tt-grid").find(".slot[id^=" + self.get("code") + "-]").remove();
                    // check empty rows and remove it
                    $.publish("grid:rows:clearEmpty");
                    // remove the DOM
                    self.$elem.fadeOut(500, function() {
                        // remove DOM itself
                        self.$elem.remove();
                        // publish event
                        $.publish("module:remove", self.get("code"));
                    });
                });
            }
        };

        /* PLUGIN DEFINITION
         * ======================================== */
        $.fn.module = function(options) {
            return this.each(function () {
                if (!$.data(this, _project + _pluginName)) {
                    $.data(this, _project + _pluginName, new Plugin(this, options));
                }
            });
        };

    }(jQuery));

});
