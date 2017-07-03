"use strict";

/**
 * Created by Wiktoria on 2017-06-27.
 */
require(["esri/map", "dojox/mobile", "dojox/mobile/parser", "esri/sniff", "esri/layers/FeatureLayer", "dojox/mobile/deviceTheme", "dojo/dom", "dijit/registry", "dojo/on", "dojox/mobile/ToolBarButton", "dojox/mobile/View", "dojox/mobile/ContentPane", "dojo/domReady!"], function (Map, mobile, parser, has, FeatureLayer, dTheme, dom, registry, on) {
    "use strict";

    mobile.hideAddressBar();

    var resizeEvt = window.onorientationchange !== undefined && !has("android") ? "orientationchange" : "resize";

    on(window, resizeEvt, resizeMap);

    var map = new Map("map", {
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13,
        slider: false
    });

    var url = "http://services7.arcgis.com/HKFAbLvHKAGc8Z6g/arcgis/rest/services/apteki/FeatureServer/0";
    var layer = new FeatureLayer(url);
    map.addLayer(layer);

    map.on("load", function () {
        resizeMap();
        registry.byId("mapView").on("AfterTransitionIn", resizeMap);
    });

    function resizeMap() {
        mobile.hideAddressBar();
        adjustMapHeight();
        map.resize();
        map.reposition();
    }

    function adjustMapHeight() {
        var availHeight = mobile.getScreenSize().h - registry.byId("header").domNode.clientHeight - 1;
        if (has("iphone") || has("ipod")) {
            availHeight += iphoneAdjustment();
        }
        dom.byId("map").style.height = availHeight + "px";
    }

    function iphoneAdjustment() {
        var sz = mobile.getScreenSize();
        if (sz.h > sz.w) {
            return screen.availHeight - window.innerHeight - 44;
        } else {
            var _conn = on(window, "resize", function () {
                _conn.remove();
                resizeMap();
            });
            return 0;
        }
    }
});