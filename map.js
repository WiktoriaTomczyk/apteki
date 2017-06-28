/**
 * Created by Wiktoria on 2017-06-27.
 */
require(["esri/map", "dojo/domReady!"], function(Map) {
    "use strict";
    const map = new Map("map",{
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13
    });
});
