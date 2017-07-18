/**
 * Created by Wiktoria on 2017-06-27.
 */
require([
    "esri/map",
    "dojox/mobile",
    "dojox/mobile/parser",
    "esri/sniff",
    "esri/layers/FeatureLayer",
    "esri/symbols/PictureMarkerSymbol",
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/symbols/SimpleFillSymbol", "esri/Color",
    "dojox/mobile/deviceTheme",
    "dojo/dom-class", "dojo/dom-construct",
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
    FeatureLayer,
    PictureMarkerSymbol,
    Popup,
    PopupTemplate,
    SimpleFillSymbol, Color,
    dTheme,
    domClass, domConstruct,
    dom,
    registry,
    on
){
    "use strict";

    mobile.hideAddressBar();

    let resizeEvt = (
        window.onorientationchange !== undefined &&
            !has("android")
    ) ? "orientationchange" : "resize";

    on(window, resizeEvt, resizeMap);

    var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
    var popup = new Popup({
        fillSymbol: fill,
        titleInBody: false
    }, domConstruct.create("div"));
    //Add the dark theme which is customized further in the <style> tag at the top of this page
    domClass.add(popup.domNode, "dark");



    const map = new Map("map", {
        basemap: "osm",
        center: [22.547502, 51.250364],
        zoom: 12,
        slider: true,
        infoWindow: popup
    });

    var template = new PopupTemplate({
        title: "Apteki",
        description: "{nazwa} <br>adres: {ulica} {numer}",
        fieldInfos: [{ //define field infos so we can specify an alias
            fieldName: "nazwa",
            label: "nazwa"
        },{
            fieldName: "ulica",
            label: "adres"
        },{
            fieldName: "numer",
            label: "numer"
        }]
    });

    const url = "http://services7.arcgis.com/HKFAbLvHKAGc8Z6g/arcgis/rest/services/apteki/FeatureServer/0";
    const pictureMarkerSymbol = new PictureMarkerSymbol("https://cdn.pixabay.com/photo/2014/03/25/16/33/pharmacy-297390_960_720.png", 25, 25);
    const layer = new FeatureLayer(url,{
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: template
    });
    layer.setSelectionSymbol(pictureMarkerSymbol);
    map.addLayer(layer);

    map.on("load", () => {
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
            let _conn = on(window, "resize", () => {
               _conn.remove();
               resizeMap();
            });
            return 0;
        }
    }
});
