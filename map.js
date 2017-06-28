/**
 * Created by Wiktoria on 2017-06-27.
 */
require(["esri/map", "esri/arcgis/utils", "dojo/domReady!"], function(Map, arcgisUtils){
    "use strict";
    /*const map = new Map("map",{
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13
    });*/
    arcgisUtils.createMap("2708931b404c406db558bc0aa8f4ab73", "map").then(function(response){
        const map = response.map;
    });
});
