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
    const map = new Map("map",{
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13
    });
});
