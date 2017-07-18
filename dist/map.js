"use strict";

/**
 * Created by Wiktoria on 2017-06-27.
 */
require(["esri/map", "dojox/mobile", "dojox/mobile/parser", "esri/sniff", "esri/layers/FeatureLayer", "esri/symbols/PictureMarkerSymbol", "esri/dijit/Popup", "esri/dijit/PopupTemplate", "dojox/mobile/deviceTheme", "dojo/dom", "dijit/registry", "dojo/on", "dojox/mobile/ToolBarButton", "dojox/mobile/View", "dojox/mobile/ContentPane", "dojo/domReady!"], function (Map, mobile, parser, has, FeatureLayer, PictureMarkerSymbol, Popup, PopupTemplate, dTheme, dom, registry, on) {
    "use strict";

    mobile.hideAddressBar();

    var resizeEvt = window.onorientationchange !== undefined && !has("android") ? "orientationchange" : "resize";

    on(window, resizeEvt, resizeMap);

    var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
    var popup = new Popup({
        fillSymbol: fill,
        titleInBody: false
    }, domConstruct.create("div"));
    //Add the dark theme which is customized further in the <style> tag at the top of this page
    domClass.add(popup.domNode, "dark");

    var map = new Map("map", {
        basemap: "osm",
        center: [22.547502, 51.250364],
        zoom: 12,
        slider: true,
        infoWindow: popup
    });

    var template = new PopupTemplate({
        title: "Apteki",
        description: "test",
        fieldInfos: [{ //define field infos so we can specify an alias
            fieldName: "nazwa",
            label: "nazwa"
        }, {
            fieldName: "adres",
            label: "adres"
        }, {
            fieldName: "numer",
            label: "numer"
        }]
    });

    var url = "http://services7.arcgis.com/HKFAbLvHKAGc8Z6g/arcgis/rest/services/apteki/FeatureServer/0";
    //const pictureMarkerSymbol = new PictureMarkerSymbol('/apteka.png', 25, 25);
    var layer = new FeatureLayer(url, {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: template
    });
    //layer.setSelectionSymbol(pictureMarkerSymbol);
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