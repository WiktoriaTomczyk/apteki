/**
 * Created by Wiktoria on 2017-06-27.
 */
const dijits = [
    "esri/map",
    "esri/arcgis/utils",
    "esri/dijit/Legend",
    "dojo/domReady!"
];

require(dijits, function(Map, arcgisUtils, Legend){
    "use strict";
    /*const map = new Map("map",{
        basemap: "osm",
        center: [22.5, 51.3649],
        zoom: 13
    });*/
    arcgisUtils.createMap("2708931b404c406db558bc0aa8f4ab73", "map").then(function(response){
        const map = response.map;

        const legend = new Legend({
            map: map,
            layerInfos: (arcgisUtils.getLegendLayers(response))
        }, "legend");
        legend.startup();
    });
});
