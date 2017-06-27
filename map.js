/**
 * Created by Wiktoria on 2017-06-27.
 */
var map;
require(["esri/map", "dojo/domReady!"], function(Map) {
    map = new Map("map", {
        basemap: "topo",
        center: [51.3649, 22.5],
        zoom: 13
    });
});