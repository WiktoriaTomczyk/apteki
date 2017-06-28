/**
 * Created by Wiktoria on 2017-06-27.
 */
var map;
require(["esri/map", "dojo/domReady!"], function(Map) {
    map = new Map("map", {
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13
    });
});
