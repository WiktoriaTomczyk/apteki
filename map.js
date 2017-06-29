/**
 * Created by Wiktoria on 2017-06-27.
 */
require([
    "esri/map",
    "dojox/mobile",
    "dojox/mobile/parser",
    "esri/sniff",
    "dojox/mobile/deviceTheme",
    "dojo/dom",
    "dijit/registry",
    "dojo/on",
    "dojox/mobile/ToolBarButton",
    "dojox/mobile/View",
    "dojox/mobile/ContentPane",
    "dojo/domReady!"
], function(
    Map,
    mobile,
    parser,
    has,
    dTheme,
    dom,
    registry,
    on
){
    "use strict";

    parser.parse();

    mobile.hideAddressBar();

    let resizeEvt = (
        window.onorientationchange !== undefined &&
            !has("android")
    ) ? "orientationchange" : "resize";

    on(window, resizeEvt, resizeMap);

    const map = new Map("map", {
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13,
        slider: false
    });

    map.on("load", function() {
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
        let availHeight = mobile.getScreenSize().h - registry.byId("header").domNode.clientHeight - 1;
        if (has("iphone") || has("ipod")) {
            availHeight += iphoneAdjustment();
        }
        dom.byId("map").style.height = availHeight + "px";
    }

    function iphoneAdjustment() {
        let sz = mobile.getScreenSize();
        if (sz.h > sz.w) {
            return screen.availHeight - window.innerHeight - 44;
        } else {
            let _conn = on(window, "resize", function () {
               _conn.remove();
               resizeMap();
            });
            return 0;
        }
    }
});
