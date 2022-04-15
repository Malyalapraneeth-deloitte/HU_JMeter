/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/js/cart.js-120", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Finish/config.json-315", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/js/cart.js-154", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/cart.html-109", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "add to cart/addtocart-102", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/check-318", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "add to cart/addtocart-103", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Finish/check-316", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/config.json-156", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/cart.html-142", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/check-105", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/entries-106", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/check-108", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/view-99", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "deleting item/viewcart-160", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "add to cart/addtocart-55", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/bm.png-311", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169", "isController": false}, {"data": [[300.0, 1.0], [800.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "login/login-261", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/viewcart-158", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115", "isController": false}, {"data": [[600.0, 1.0], [800.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Register/login-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/check-157", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/check-159", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/bm.png-155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "purchasing/deletecart-170", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "purchasing/deletecart-171", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/check-100", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Finish/entries-317", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/config.json-123", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-163", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-164", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ok/index.html-172", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-161", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-162", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-165", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/view-166", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "Register/signup-315", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/deleteitem-140", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/view-76", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "deleting item/deleteitem-141", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-134", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-133", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-135", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "add to cart/addtocart-79", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Finish/index.html-299", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-130", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/js/index.js-306", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-132", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-131", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "add to cart/addtocart-80", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-129", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/view-128", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/viewcart-127", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/viewcart-125", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/check-77", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "openingcart/check-126", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/check-60", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "openingcart/check-124", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "openingcart/bm.png-122", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 10.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 108.0, "series": [{"data": [[0.0, 108.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 10.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.65001128E12, "maxY": 3.25, "series": [{"data": [[1.65001128E12, 1.0]], "isOverall": false, "label": "Purchase", "isController": false}, {"data": [[1.65001128E12, 1.0]], "isOverall": false, "label": "contact", "isController": false}, {"data": [[1.65001128E12, 1.0]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[1.65001128E12, 2.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.65001128E12, 3.25]], "isOverall": false, "label": "register", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001128E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 50.0, "minX": 1.0, "maxY": 870.0, "series": [{"data": [[1.0, 317.0]], "isOverall": false, "label": "openingcart/js/cart.js-120", "isController": false}, {"data": [[1.0, 317.0]], "isOverall": false, "label": "openingcart/js/cart.js-120-Aggregated", "isController": false}, {"data": [[1.0, 259.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", "isController": false}, {"data": [[1.0, 259.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153-Aggregated", "isController": false}, {"data": [[2.0, 195.0]], "isOverall": false, "label": "Finish/config.json-315", "isController": false}, {"data": [[2.0, 195.0]], "isOverall": false, "label": "Finish/config.json-315-Aggregated", "isController": false}, {"data": [[2.0, 75.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312", "isController": false}, {"data": [[2.0, 75.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116-Aggregated", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137-Aggregated", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175-Aggregated", "isController": false}, {"data": [[7.0, 259.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300", "isController": false}, {"data": [[7.0, 259.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "deleting item/js/cart.js-154", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "deleting item/js/cart.js-154-Aggregated", "isController": false}, {"data": [[2.0, 389.0]], "isOverall": false, "label": "openingcart/cart.html-109", "isController": false}, {"data": [[2.0, 389.0]], "isOverall": false, "label": "openingcart/cart.html-109-Aggregated", "isController": false}, {"data": [[2.0, 63.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113", "isController": false}, {"data": [[2.0, 63.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113-Aggregated", "isController": false}, {"data": [[2.0, 255.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", "isController": false}, {"data": [[2.0, 255.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111-Aggregated", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118-Aggregated", "isController": false}, {"data": [[2.0, 318.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322", "isController": false}, {"data": [[2.0, 318.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322-Aggregated", "isController": false}, {"data": [[2.0, 309.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", "isController": false}, {"data": [[2.0, 309.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119-Aggregated", "isController": false}, {"data": [[2.0, 524.0]], "isOverall": false, "label": "add to cart/addtocart-102", "isController": false}, {"data": [[2.0, 524.0]], "isOverall": false, "label": "add to cart/addtocart-102-Aggregated", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "Finish/check-318", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "Finish/check-318-Aggregated", "isController": false}, {"data": [[2.0, 355.0]], "isOverall": false, "label": "add to cart/addtocart-103", "isController": false}, {"data": [[2.0, 355.0]], "isOverall": false, "label": "add to cart/addtocart-103-Aggregated", "isController": false}, {"data": [[2.0, 490.0]], "isOverall": false, "label": "Finish/check-316", "isController": false}, {"data": [[2.0, 490.0]], "isOverall": false, "label": "Finish/check-316-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136-Aggregated", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "deleting item/config.json-156", "isController": false}, {"data": [[1.0, 254.0]], "isOverall": false, "label": "deleting item/config.json-156-Aggregated", "isController": false}, {"data": [[1.0, 265.0]], "isOverall": false, "label": "deleting item/cart.html-142", "isController": false}, {"data": [[1.0, 265.0]], "isOverall": false, "label": "deleting item/cart.html-142-Aggregated", "isController": false}, {"data": [[2.0, 258.0]], "isOverall": false, "label": "/check-105", "isController": false}, {"data": [[2.0, 258.0]], "isOverall": false, "label": "/check-105-Aggregated", "isController": false}, {"data": [[1.0, 537.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174", "isController": false}, {"data": [[1.0, 537.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174-Aggregated", "isController": false}, {"data": [[2.0, 349.0]], "isOverall": false, "label": "/entries-106", "isController": false}, {"data": [[2.0, 349.0]], "isOverall": false, "label": "/entries-106-Aggregated", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149-Aggregated", "isController": false}, {"data": [[2.0, 382.0]], "isOverall": false, "label": "/check-108", "isController": false}, {"data": [[2.0, 382.0]], "isOverall": false, "label": "/check-108-Aggregated", "isController": false}, {"data": [[2.0, 282.0]], "isOverall": false, "label": "/view-99", "isController": false}, {"data": [[2.0, 282.0]], "isOverall": false, "label": "/view-99-Aggregated", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145-Aggregated", "isController": false}, {"data": [[1.0, 420.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", "isController": false}, {"data": [[1.0, 420.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121-Aggregated", "isController": false}, {"data": [[1.0, 310.0]], "isOverall": false, "label": "deleting item/viewcart-160", "isController": false}, {"data": [[1.0, 310.0]], "isOverall": false, "label": "deleting item/viewcart-160-Aggregated", "isController": false}, {"data": [[7.0, 870.0]], "isOverall": false, "label": "add to cart/addtocart-55", "isController": false}, {"data": [[7.0, 870.0]], "isOverall": false, "label": "add to cart/addtocart-55-Aggregated", "isController": false}, {"data": [[2.0, 299.0]], "isOverall": false, "label": "Finish/bm.png-311", "isController": false}, {"data": [[2.0, 299.0]], "isOverall": false, "label": "Finish/bm.png-311-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169-Aggregated", "isController": false}, {"data": [[8.0, 822.0], [9.0, 815.0], [10.0, 522.0], [7.0, 374.0]], "isOverall": false, "label": "login/login-261", "isController": false}, {"data": [[8.5, 633.25]], "isOverall": false, "label": "login/login-261-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "deleting item/viewcart-158", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "deleting item/viewcart-158-Aggregated", "isController": false}, {"data": [[1.0, 260.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", "isController": false}, {"data": [[1.0, 260.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152-Aggregated", "isController": false}, {"data": [[2.0, 270.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115", "isController": false}, {"data": [[2.0, 270.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115-Aggregated", "isController": false}, {"data": [[6.0, 409.0], [7.0, 683.6666666666666]], "isOverall": false, "label": "Register/login-3", "isController": false}, {"data": [[6.75, 615.0]], "isOverall": false, "label": "Register/login-3-Aggregated", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "deleting item/check-157", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "deleting item/check-157-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "deleting item/check-159", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "deleting item/check-159-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "deleting item/bm.png-155", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "deleting item/bm.png-155-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150-Aggregated", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "purchasing/deletecart-170", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "purchasing/deletecart-170-Aggregated", "isController": false}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151", "isController": false}, {"data": [[1.0, 250.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151-Aggregated", "isController": false}, {"data": [[1.0, 382.0]], "isOverall": false, "label": "purchasing/deletecart-171", "isController": false}, {"data": [[1.0, 382.0]], "isOverall": false, "label": "purchasing/deletecart-171-Aggregated", "isController": false}, {"data": [[2.0, 374.0]], "isOverall": false, "label": "/check-100", "isController": false}, {"data": [[2.0, 374.0]], "isOverall": false, "label": "/check-100-Aggregated", "isController": false}, {"data": [[2.0, 300.0]], "isOverall": false, "label": "Finish/entries-317", "isController": false}, {"data": [[2.0, 300.0]], "isOverall": false, "label": "Finish/entries-317-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "openingcart/config.json-123", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "openingcart/config.json-123-Aggregated", "isController": false}, {"data": [[2.0, 329.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324", "isController": false}, {"data": [[2.0, 329.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "deleting item/view-163", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "deleting item/view-163-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "deleting item/view-164", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "deleting item/view-164-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "ok/index.html-172", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "ok/index.html-172-Aggregated", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "deleting item/view-161", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "deleting item/view-161-Aggregated", "isController": false}, {"data": [[1.0, 347.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167", "isController": false}, {"data": [[1.0, 347.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167-Aggregated", "isController": false}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "deleting item/view-162", "isController": false}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "deleting item/view-162-Aggregated", "isController": false}, {"data": [[2.0, 354.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", "isController": false}, {"data": [[2.0, 354.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "deleting item/view-165", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "deleting item/view-165-Aggregated", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "deleting item/view-166", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "deleting item/view-166-Aggregated", "isController": false}, {"data": [[1.0, 318.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139", "isController": false}, {"data": [[1.0, 318.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139-Aggregated", "isController": false}, {"data": [[4.0, 277.0], [5.0, 273.0], [6.0, 265.0], [3.0, 284.0]], "isOverall": false, "label": "Register/signup-315", "isController": false}, {"data": [[4.5, 274.75]], "isOverall": false, "label": "Register/signup-315-Aggregated", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "deleting item/deleteitem-140", "isController": false}, {"data": [[1.0, 288.0]], "isOverall": false, "label": "deleting item/deleteitem-140-Aggregated", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "/view-76", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "/view-76-Aggregated", "isController": false}, {"data": [[1.0, 309.0]], "isOverall": false, "label": "deleting item/deleteitem-141", "isController": false}, {"data": [[1.0, 309.0]], "isOverall": false, "label": "deleting item/deleteitem-141-Aggregated", "isController": false}, {"data": [[2.0, 143.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314", "isController": false}, {"data": [[2.0, 143.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314-Aggregated", "isController": false}, {"data": [[2.0, 78.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323", "isController": false}, {"data": [[2.0, 78.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "openingcart/view-134", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "openingcart/view-134-Aggregated", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144", "isController": false}, {"data": [[1.0, 244.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "openingcart/view-133", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "openingcart/view-133-Aggregated", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "openingcart/view-135", "isController": false}, {"data": [[1.0, 279.0]], "isOverall": false, "label": "openingcart/view-135-Aggregated", "isController": false}, {"data": [[2.0, 307.0]], "isOverall": false, "label": "add to cart/addtocart-79", "isController": false}, {"data": [[2.0, 307.0]], "isOverall": false, "label": "add to cart/addtocart-79-Aggregated", "isController": false}, {"data": [[8.0, 530.0]], "isOverall": false, "label": "Finish/index.html-299", "isController": false}, {"data": [[8.0, 530.0]], "isOverall": false, "label": "Finish/index.html-299-Aggregated", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "openingcart/view-130", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "openingcart/view-130-Aggregated", "isController": false}, {"data": [[2.0, 255.0]], "isOverall": false, "label": "Finish/js/index.js-306", "isController": false}, {"data": [[2.0, 255.0]], "isOverall": false, "label": "Finish/js/index.js-306-Aggregated", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "openingcart/view-132", "isController": false}, {"data": [[1.0, 281.0]], "isOverall": false, "label": "openingcart/view-132-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "openingcart/view-131", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "openingcart/view-131-Aggregated", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112-Aggregated", "isController": false}, {"data": [[2.0, 396.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321", "isController": false}, {"data": [[2.0, 396.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321-Aggregated", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148-Aggregated", "isController": false}, {"data": [[2.0, 327.0]], "isOverall": false, "label": "add to cart/addtocart-80", "isController": false}, {"data": [[2.0, 327.0]], "isOverall": false, "label": "add to cart/addtocart-80-Aggregated", "isController": false}, {"data": [[2.0, 57.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304", "isController": false}, {"data": [[2.0, 57.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304-Aggregated", "isController": false}, {"data": [[2.0, 112.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", "isController": false}, {"data": [[2.0, 112.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305-Aggregated", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143-Aggregated", "isController": false}, {"data": [[1.0, 266.0]], "isOverall": false, "label": "openingcart/view-129", "isController": false}, {"data": [[1.0, 266.0]], "isOverall": false, "label": "openingcart/view-129-Aggregated", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "openingcart/view-128", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "openingcart/view-128-Aggregated", "isController": false}, {"data": [[2.0, 69.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114", "isController": false}, {"data": [[2.0, 69.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "openingcart/viewcart-127", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "openingcart/viewcart-127-Aggregated", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "openingcart/viewcart-125", "isController": false}, {"data": [[1.0, 256.0]], "isOverall": false, "label": "openingcart/viewcart-125-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117-Aggregated", "isController": false}, {"data": [[3.0, 293.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", "isController": false}, {"data": [[3.0, 293.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303-Aggregated", "isController": false}, {"data": [[1.0, 258.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147", "isController": false}, {"data": [[1.0, 258.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147-Aggregated", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310-Aggregated", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320", "isController": false}, {"data": [[2.0, 85.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320-Aggregated", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308-Aggregated", "isController": false}, {"data": [[2.0, 516.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313", "isController": false}, {"data": [[2.0, 516.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313-Aggregated", "isController": false}, {"data": [[2.0, 277.0]], "isOverall": false, "label": "/check-77", "isController": false}, {"data": [[2.0, 277.0]], "isOverall": false, "label": "/check-77-Aggregated", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "openingcart/check-126", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "openingcart/check-126-Aggregated", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325-Aggregated", "isController": false}, {"data": [[5.0, 272.0]], "isOverall": false, "label": "/check-60", "isController": false}, {"data": [[5.0, 272.0]], "isOverall": false, "label": "/check-60-Aggregated", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138-Aggregated", "isController": false}, {"data": [[2.0, 270.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319", "isController": false}, {"data": [[2.0, 270.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "openingcart/check-124", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "openingcart/check-124-Aggregated", "isController": false}, {"data": [[2.0, 258.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309", "isController": false}, {"data": [[2.0, 258.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309-Aggregated", "isController": false}, {"data": [[2.0, 121.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302", "isController": false}, {"data": [[2.0, 121.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "openingcart/bm.png-122", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "openingcart/bm.png-122-Aggregated", "isController": false}, {"data": [[9.0, 94.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301", "isController": false}, {"data": [[9.0, 94.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 886.95, "minX": 1.65001128E12, "maxY": 61823.8, "series": [{"data": [[1.65001128E12, 61823.8]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.65001128E12, 886.95]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001128E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 50.0, "minX": 1.65001128E12, "maxY": 870.0, "series": [{"data": [[1.65001128E12, 317.0]], "isOverall": false, "label": "openingcart/js/cart.js-120", "isController": false}, {"data": [[1.65001128E12, 259.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", "isController": false}, {"data": [[1.65001128E12, 195.0]], "isOverall": false, "label": "Finish/config.json-315", "isController": false}, {"data": [[1.65001128E12, 75.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312", "isController": false}, {"data": [[1.65001128E12, 91.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116", "isController": false}, {"data": [[1.65001128E12, 262.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.65001128E12, 415.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175", "isController": false}, {"data": [[1.65001128E12, 259.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300", "isController": false}, {"data": [[1.65001128E12, 251.0]], "isOverall": false, "label": "deleting item/js/cart.js-154", "isController": false}, {"data": [[1.65001128E12, 389.0]], "isOverall": false, "label": "openingcart/cart.html-109", "isController": false}, {"data": [[1.65001128E12, 63.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113", "isController": false}, {"data": [[1.65001128E12, 255.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", "isController": false}, {"data": [[1.65001128E12, 279.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118", "isController": false}, {"data": [[1.65001128E12, 318.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322", "isController": false}, {"data": [[1.65001128E12, 309.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", "isController": false}, {"data": [[1.65001128E12, 288.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", "isController": false}, {"data": [[1.65001128E12, 524.0]], "isOverall": false, "label": "add to cart/addtocart-102", "isController": false}, {"data": [[1.65001128E12, 279.0]], "isOverall": false, "label": "Finish/check-318", "isController": false}, {"data": [[1.65001128E12, 355.0]], "isOverall": false, "label": "add to cart/addtocart-103", "isController": false}, {"data": [[1.65001128E12, 490.0]], "isOverall": false, "label": "Finish/check-316", "isController": false}, {"data": [[1.65001128E12, 66.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136", "isController": false}, {"data": [[1.65001128E12, 254.0]], "isOverall": false, "label": "deleting item/config.json-156", "isController": false}, {"data": [[1.65001128E12, 265.0]], "isOverall": false, "label": "deleting item/cart.html-142", "isController": false}, {"data": [[1.65001128E12, 258.0]], "isOverall": false, "label": "/check-105", "isController": false}, {"data": [[1.65001128E12, 537.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174", "isController": false}, {"data": [[1.65001128E12, 349.0]], "isOverall": false, "label": "/entries-106", "isController": false}, {"data": [[1.65001128E12, 52.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149", "isController": false}, {"data": [[1.65001128E12, 382.0]], "isOverall": false, "label": "/check-108", "isController": false}, {"data": [[1.65001128E12, 282.0]], "isOverall": false, "label": "/view-99", "isController": false}, {"data": [[1.65001128E12, 247.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", "isController": false}, {"data": [[1.65001128E12, 420.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", "isController": false}, {"data": [[1.65001128E12, 310.0]], "isOverall": false, "label": "deleting item/viewcart-160", "isController": false}, {"data": [[1.65001128E12, 870.0]], "isOverall": false, "label": "add to cart/addtocart-55", "isController": false}, {"data": [[1.65001128E12, 299.0]], "isOverall": false, "label": "Finish/bm.png-311", "isController": false}, {"data": [[1.65001128E12, 79.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169", "isController": false}, {"data": [[1.65001128E12, 633.25]], "isOverall": false, "label": "login/login-261", "isController": false}, {"data": [[1.65001128E12, 271.0]], "isOverall": false, "label": "deleting item/viewcart-158", "isController": false}, {"data": [[1.65001128E12, 260.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", "isController": false}, {"data": [[1.65001128E12, 270.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115", "isController": false}, {"data": [[1.65001128E12, 615.0]], "isOverall": false, "label": "Register/login-3", "isController": false}, {"data": [[1.65001128E12, 262.0]], "isOverall": false, "label": "deleting item/check-157", "isController": false}, {"data": [[1.65001128E12, 279.0]], "isOverall": false, "label": "deleting item/check-159", "isController": false}, {"data": [[1.65001128E12, 269.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168", "isController": false}, {"data": [[1.65001128E12, 50.0]], "isOverall": false, "label": "deleting item/bm.png-155", "isController": false}, {"data": [[1.65001128E12, 66.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", "isController": false}, {"data": [[1.65001128E12, 256.0]], "isOverall": false, "label": "purchasing/deletecart-170", "isController": false}, {"data": [[1.65001128E12, 250.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151", "isController": false}, {"data": [[1.65001128E12, 382.0]], "isOverall": false, "label": "purchasing/deletecart-171", "isController": false}, {"data": [[1.65001128E12, 374.0]], "isOverall": false, "label": "/check-100", "isController": false}, {"data": [[1.65001128E12, 300.0]], "isOverall": false, "label": "Finish/entries-317", "isController": false}, {"data": [[1.65001128E12, 271.0]], "isOverall": false, "label": "openingcart/config.json-123", "isController": false}, {"data": [[1.65001128E12, 329.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324", "isController": false}, {"data": [[1.65001128E12, 274.0]], "isOverall": false, "label": "deleting item/view-163", "isController": false}, {"data": [[1.65001128E12, 276.0]], "isOverall": false, "label": "deleting item/view-164", "isController": false}, {"data": [[1.65001128E12, 196.0]], "isOverall": false, "label": "ok/index.html-172", "isController": false}, {"data": [[1.65001128E12, 268.0]], "isOverall": false, "label": "deleting item/view-161", "isController": false}, {"data": [[1.65001128E12, 347.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167", "isController": false}, {"data": [[1.65001128E12, 261.0]], "isOverall": false, "label": "deleting item/view-162", "isController": false}, {"data": [[1.65001128E12, 354.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", "isController": false}, {"data": [[1.65001128E12, 60.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146", "isController": false}, {"data": [[1.65001128E12, 280.0]], "isOverall": false, "label": "deleting item/view-165", "isController": false}, {"data": [[1.65001128E12, 275.0]], "isOverall": false, "label": "deleting item/view-166", "isController": false}, {"data": [[1.65001128E12, 318.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139", "isController": false}, {"data": [[1.65001128E12, 274.75]], "isOverall": false, "label": "Register/signup-315", "isController": false}, {"data": [[1.65001128E12, 288.0]], "isOverall": false, "label": "deleting item/deleteitem-140", "isController": false}, {"data": [[1.65001128E12, 278.0]], "isOverall": false, "label": "/view-76", "isController": false}, {"data": [[1.65001128E12, 309.0]], "isOverall": false, "label": "deleting item/deleteitem-141", "isController": false}, {"data": [[1.65001128E12, 143.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314", "isController": false}, {"data": [[1.65001128E12, 78.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323", "isController": false}, {"data": [[1.65001128E12, 282.0]], "isOverall": false, "label": "openingcart/view-134", "isController": false}, {"data": [[1.65001128E12, 244.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144", "isController": false}, {"data": [[1.65001128E12, 281.0]], "isOverall": false, "label": "openingcart/view-133", "isController": false}, {"data": [[1.65001128E12, 279.0]], "isOverall": false, "label": "openingcart/view-135", "isController": false}, {"data": [[1.65001128E12, 307.0]], "isOverall": false, "label": "add to cart/addtocart-79", "isController": false}, {"data": [[1.65001128E12, 530.0]], "isOverall": false, "label": "Finish/index.html-299", "isController": false}, {"data": [[1.65001128E12, 262.0]], "isOverall": false, "label": "openingcart/view-130", "isController": false}, {"data": [[1.65001128E12, 255.0]], "isOverall": false, "label": "Finish/js/index.js-306", "isController": false}, {"data": [[1.65001128E12, 281.0]], "isOverall": false, "label": "openingcart/view-132", "isController": false}, {"data": [[1.65001128E12, 293.0]], "isOverall": false, "label": "openingcart/view-131", "isController": false}, {"data": [[1.65001128E12, 249.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112", "isController": false}, {"data": [[1.65001128E12, 396.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321", "isController": false}, {"data": [[1.65001128E12, 72.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148", "isController": false}, {"data": [[1.65001128E12, 327.0]], "isOverall": false, "label": "add to cart/addtocart-80", "isController": false}, {"data": [[1.65001128E12, 57.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304", "isController": false}, {"data": [[1.65001128E12, 112.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", "isController": false}, {"data": [[1.65001128E12, 53.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", "isController": false}, {"data": [[1.65001128E12, 266.0]], "isOverall": false, "label": "openingcart/view-129", "isController": false}, {"data": [[1.65001128E12, 268.0]], "isOverall": false, "label": "openingcart/view-128", "isController": false}, {"data": [[1.65001128E12, 69.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114", "isController": false}, {"data": [[1.65001128E12, 305.0]], "isOverall": false, "label": "openingcart/viewcart-127", "isController": false}, {"data": [[1.65001128E12, 256.0]], "isOverall": false, "label": "openingcart/viewcart-125", "isController": false}, {"data": [[1.65001128E12, 304.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", "isController": false}, {"data": [[1.65001128E12, 293.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", "isController": false}, {"data": [[1.65001128E12, 258.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147", "isController": false}, {"data": [[1.65001128E12, 68.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310", "isController": false}, {"data": [[1.65001128E12, 85.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320", "isController": false}, {"data": [[1.65001128E12, 68.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308", "isController": false}, {"data": [[1.65001128E12, 516.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313", "isController": false}, {"data": [[1.65001128E12, 277.0]], "isOverall": false, "label": "/check-77", "isController": false}, {"data": [[1.65001128E12, 311.0]], "isOverall": false, "label": "openingcart/check-126", "isController": false}, {"data": [[1.65001128E12, 278.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325", "isController": false}, {"data": [[1.65001128E12, 272.0]], "isOverall": false, "label": "/check-60", "isController": false}, {"data": [[1.65001128E12, 190.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138", "isController": false}, {"data": [[1.65001128E12, 270.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319", "isController": false}, {"data": [[1.65001128E12, 280.0]], "isOverall": false, "label": "openingcart/check-124", "isController": false}, {"data": [[1.65001128E12, 258.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309", "isController": false}, {"data": [[1.65001128E12, 121.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302", "isController": false}, {"data": [[1.65001128E12, 408.0]], "isOverall": false, "label": "openingcart/bm.png-122", "isController": false}, {"data": [[1.65001128E12, 94.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001128E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 50.0, "minX": 1.65001128E12, "maxY": 870.0, "series": [{"data": [[1.65001128E12, 317.0]], "isOverall": false, "label": "openingcart/js/cart.js-120", "isController": false}, {"data": [[1.65001128E12, 257.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", "isController": false}, {"data": [[1.65001128E12, 195.0]], "isOverall": false, "label": "Finish/config.json-315", "isController": false}, {"data": [[1.65001128E12, 73.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312", "isController": false}, {"data": [[1.65001128E12, 52.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116", "isController": false}, {"data": [[1.65001128E12, 250.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.65001128E12, 385.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175", "isController": false}, {"data": [[1.65001128E12, 259.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300", "isController": false}, {"data": [[1.65001128E12, 251.0]], "isOverall": false, "label": "deleting item/js/cart.js-154", "isController": false}, {"data": [[1.65001128E12, 365.0]], "isOverall": false, "label": "openingcart/cart.html-109", "isController": false}, {"data": [[1.65001128E12, 63.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113", "isController": false}, {"data": [[1.65001128E12, 254.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", "isController": false}, {"data": [[1.65001128E12, 278.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118", "isController": false}, {"data": [[1.65001128E12, 283.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322", "isController": false}, {"data": [[1.65001128E12, 296.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", "isController": false}, {"data": [[1.65001128E12, 276.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", "isController": false}, {"data": [[1.65001128E12, 524.0]], "isOverall": false, "label": "add to cart/addtocart-102", "isController": false}, {"data": [[1.65001128E12, 277.0]], "isOverall": false, "label": "Finish/check-318", "isController": false}, {"data": [[1.65001128E12, 355.0]], "isOverall": false, "label": "add to cart/addtocart-103", "isController": false}, {"data": [[1.65001128E12, 490.0]], "isOverall": false, "label": "Finish/check-316", "isController": false}, {"data": [[1.65001128E12, 61.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136", "isController": false}, {"data": [[1.65001128E12, 254.0]], "isOverall": false, "label": "deleting item/config.json-156", "isController": false}, {"data": [[1.65001128E12, 265.0]], "isOverall": false, "label": "deleting item/cart.html-142", "isController": false}, {"data": [[1.65001128E12, 258.0]], "isOverall": false, "label": "/check-105", "isController": false}, {"data": [[1.65001128E12, 410.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174", "isController": false}, {"data": [[1.65001128E12, 344.0]], "isOverall": false, "label": "/entries-106", "isController": false}, {"data": [[1.65001128E12, 52.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149", "isController": false}, {"data": [[1.65001128E12, 382.0]], "isOverall": false, "label": "/check-108", "isController": false}, {"data": [[1.65001128E12, 281.0]], "isOverall": false, "label": "/view-99", "isController": false}, {"data": [[1.65001128E12, 246.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", "isController": false}, {"data": [[1.65001128E12, 419.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", "isController": false}, {"data": [[1.65001128E12, 309.0]], "isOverall": false, "label": "deleting item/viewcart-160", "isController": false}, {"data": [[1.65001128E12, 870.0]], "isOverall": false, "label": "add to cart/addtocart-55", "isController": false}, {"data": [[1.65001128E12, 298.0]], "isOverall": false, "label": "Finish/bm.png-311", "isController": false}, {"data": [[1.65001128E12, 54.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169", "isController": false}, {"data": [[1.65001128E12, 631.75]], "isOverall": false, "label": "login/login-261", "isController": false}, {"data": [[1.65001128E12, 271.0]], "isOverall": false, "label": "deleting item/viewcart-158", "isController": false}, {"data": [[1.65001128E12, 259.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", "isController": false}, {"data": [[1.65001128E12, 253.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115", "isController": false}, {"data": [[1.65001128E12, 614.0]], "isOverall": false, "label": "Register/login-3", "isController": false}, {"data": [[1.65001128E12, 262.0]], "isOverall": false, "label": "deleting item/check-157", "isController": false}, {"data": [[1.65001128E12, 279.0]], "isOverall": false, "label": "deleting item/check-159", "isController": false}, {"data": [[1.65001128E12, 252.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168", "isController": false}, {"data": [[1.65001128E12, 50.0]], "isOverall": false, "label": "deleting item/bm.png-155", "isController": false}, {"data": [[1.65001128E12, 62.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", "isController": false}, {"data": [[1.65001128E12, 256.0]], "isOverall": false, "label": "purchasing/deletecart-170", "isController": false}, {"data": [[1.65001128E12, 249.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151", "isController": false}, {"data": [[1.65001128E12, 382.0]], "isOverall": false, "label": "purchasing/deletecart-171", "isController": false}, {"data": [[1.65001128E12, 373.0]], "isOverall": false, "label": "/check-100", "isController": false}, {"data": [[1.65001128E12, 296.0]], "isOverall": false, "label": "Finish/entries-317", "isController": false}, {"data": [[1.65001128E12, 271.0]], "isOverall": false, "label": "openingcart/config.json-123", "isController": false}, {"data": [[1.65001128E12, 295.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324", "isController": false}, {"data": [[1.65001128E12, 274.0]], "isOverall": false, "label": "deleting item/view-163", "isController": false}, {"data": [[1.65001128E12, 276.0]], "isOverall": false, "label": "deleting item/view-164", "isController": false}, {"data": [[1.65001128E12, 196.0]], "isOverall": false, "label": "ok/index.html-172", "isController": false}, {"data": [[1.65001128E12, 268.0]], "isOverall": false, "label": "deleting item/view-161", "isController": false}, {"data": [[1.65001128E12, 331.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167", "isController": false}, {"data": [[1.65001128E12, 261.0]], "isOverall": false, "label": "deleting item/view-162", "isController": false}, {"data": [[1.65001128E12, 303.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", "isController": false}, {"data": [[1.65001128E12, 59.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146", "isController": false}, {"data": [[1.65001128E12, 278.0]], "isOverall": false, "label": "deleting item/view-165", "isController": false}, {"data": [[1.65001128E12, 270.0]], "isOverall": false, "label": "deleting item/view-166", "isController": false}, {"data": [[1.65001128E12, 276.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139", "isController": false}, {"data": [[1.65001128E12, 273.0]], "isOverall": false, "label": "Register/signup-315", "isController": false}, {"data": [[1.65001128E12, 288.0]], "isOverall": false, "label": "deleting item/deleteitem-140", "isController": false}, {"data": [[1.65001128E12, 275.0]], "isOverall": false, "label": "/view-76", "isController": false}, {"data": [[1.65001128E12, 309.0]], "isOverall": false, "label": "deleting item/deleteitem-141", "isController": false}, {"data": [[1.65001128E12, 141.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314", "isController": false}, {"data": [[1.65001128E12, 66.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323", "isController": false}, {"data": [[1.65001128E12, 281.0]], "isOverall": false, "label": "openingcart/view-134", "isController": false}, {"data": [[1.65001128E12, 244.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144", "isController": false}, {"data": [[1.65001128E12, 281.0]], "isOverall": false, "label": "openingcart/view-133", "isController": false}, {"data": [[1.65001128E12, 277.0]], "isOverall": false, "label": "openingcart/view-135", "isController": false}, {"data": [[1.65001128E12, 307.0]], "isOverall": false, "label": "add to cart/addtocart-79", "isController": false}, {"data": [[1.65001128E12, 529.0]], "isOverall": false, "label": "Finish/index.html-299", "isController": false}, {"data": [[1.65001128E12, 262.0]], "isOverall": false, "label": "openingcart/view-130", "isController": false}, {"data": [[1.65001128E12, 255.0]], "isOverall": false, "label": "Finish/js/index.js-306", "isController": false}, {"data": [[1.65001128E12, 280.0]], "isOverall": false, "label": "openingcart/view-132", "isController": false}, {"data": [[1.65001128E12, 293.0]], "isOverall": false, "label": "openingcart/view-131", "isController": false}, {"data": [[1.65001128E12, 248.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112", "isController": false}, {"data": [[1.65001128E12, 370.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321", "isController": false}, {"data": [[1.65001128E12, 61.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148", "isController": false}, {"data": [[1.65001128E12, 327.0]], "isOverall": false, "label": "add to cart/addtocart-80", "isController": false}, {"data": [[1.65001128E12, 56.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304", "isController": false}, {"data": [[1.65001128E12, 111.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", "isController": false}, {"data": [[1.65001128E12, 51.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", "isController": false}, {"data": [[1.65001128E12, 266.0]], "isOverall": false, "label": "openingcart/view-129", "isController": false}, {"data": [[1.65001128E12, 268.0]], "isOverall": false, "label": "openingcart/view-128", "isController": false}, {"data": [[1.65001128E12, 69.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114", "isController": false}, {"data": [[1.65001128E12, 303.0]], "isOverall": false, "label": "openingcart/viewcart-127", "isController": false}, {"data": [[1.65001128E12, 256.0]], "isOverall": false, "label": "openingcart/viewcart-125", "isController": false}, {"data": [[1.65001128E12, 291.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", "isController": false}, {"data": [[1.65001128E12, 258.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", "isController": false}, {"data": [[1.65001128E12, 257.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147", "isController": false}, {"data": [[1.65001128E12, 67.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310", "isController": false}, {"data": [[1.65001128E12, 53.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320", "isController": false}, {"data": [[1.65001128E12, 67.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308", "isController": false}, {"data": [[1.65001128E12, 513.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313", "isController": false}, {"data": [[1.65001128E12, 272.0]], "isOverall": false, "label": "/check-77", "isController": false}, {"data": [[1.65001128E12, 311.0]], "isOverall": false, "label": "openingcart/check-126", "isController": false}, {"data": [[1.65001128E12, 269.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325", "isController": false}, {"data": [[1.65001128E12, 272.0]], "isOverall": false, "label": "/check-60", "isController": false}, {"data": [[1.65001128E12, 159.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138", "isController": false}, {"data": [[1.65001128E12, 260.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319", "isController": false}, {"data": [[1.65001128E12, 280.0]], "isOverall": false, "label": "openingcart/check-124", "isController": false}, {"data": [[1.65001128E12, 257.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309", "isController": false}, {"data": [[1.65001128E12, 66.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302", "isController": false}, {"data": [[1.65001128E12, 407.0]], "isOverall": false, "label": "openingcart/bm.png-122", "isController": false}, {"data": [[1.65001128E12, 55.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001128E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65001128E12, "maxY": 468.0, "series": [{"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/js/cart.js-120", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/config.json-315", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/nexus1.jpg-312", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/css/latostyle.css-300", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/js/cart.js-154", "isController": false}, {"data": [[1.65001128E12, 115.0]], "isOverall": false, "label": "openingcart/cart.html-109", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/css/latofonts.css-113", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "add to cart/addtocart-102", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/check-318", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "add to cart/addtocart-103", "isController": false}, {"data": [[1.65001128E12, 208.0]], "isOverall": false, "label": "Finish/check-316", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/config.json-156", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/cart.html-142", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/check-105", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/entries-106", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/css/latofonts.css-149", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/check-108", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/view-99", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/viewcart-160", "isController": false}, {"data": [[1.65001128E12, 468.0]], "isOverall": false, "label": "add to cart/addtocart-55", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/bm.png-311", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169", "isController": false}, {"data": [[1.65001128E12, 320.75]], "isOverall": false, "label": "login/login-261", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/viewcart-158", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115", "isController": false}, {"data": [[1.65001128E12, 251.25]], "isOverall": false, "label": "Register/login-3", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/check-157", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/check-159", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/bm.png-155", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "purchasing/deletecart-170", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "purchasing/deletecart-171", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/check-100", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/entries-317", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/config.json-123", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-163", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-164", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "ok/index.html-172", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-161", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-162", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-165", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/view-166", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Register/signup-315", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/deleteitem-140", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/view-76", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/deleteitem-141", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/front.jpg-314", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-134", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/css/latostyle.css-144", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-133", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-135", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "add to cart/addtocart-79", "isController": false}, {"data": [[1.65001128E12, 468.0]], "isOverall": false, "label": "Finish/index.html-299", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-130", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/js/index.js-306", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-132", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-131", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "add to cart/addtocart-80", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-129", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/view-128", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/css/latostyle.css-114", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/viewcart-127", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/viewcart-125", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/Samsung1.jpg-310", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/iphone1.jpg-313", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/check-77", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/check-126", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "/check-60", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/check-124", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/css/latofonts.css-309", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "openingcart/bm.png-122", "isController": false}, {"data": [[1.65001128E12, 0.0]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001128E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 50.0, "minX": 1.65001128E12, "maxY": 871.0, "series": [{"data": [[1.65001128E12, 871.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.65001128E12, 483.70000000000005]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.65001128E12, 870.81]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.65001128E12, 544.9999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.65001128E12, 50.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.65001128E12, 276.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001128E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 200.5, "minX": 2.0, "maxY": 476.0, "series": [{"data": [[8.0, 319.0], [4.0, 274.5], [2.0, 476.0], [17.0, 277.0], [9.0, 255.0], [10.0, 200.5], [5.0, 275.0], [6.0, 254.0], [3.0, 288.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 199.0, "minX": 2.0, "maxY": 397.5, "series": [{"data": [[8.0, 295.5], [4.0, 272.5], [2.0, 397.5], [17.0, 273.0], [9.0, 253.0], [10.0, 199.0], [5.0, 274.0], [6.0, 253.0], [3.0, 280.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.9666666666666666, "minX": 1.65001128E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.65001128E12, 1.9666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001128E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.9666666666666666, "minX": 1.65001128E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.65001128E12, 1.9666666666666666]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001128E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.65001128E12, "maxY": 0.06666666666666667, "series": [{"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "add to cart/addtocart-80-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/bm.png-311-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/css/latofonts.css-149-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/check-77-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/jquery/dist/jquery.min.js-115-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/bm.png-155-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "add to cart/addtocart-102-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/tether/dist/js/tether.min.js-304-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143-success", "isController": false}, {"data": [[1.65001128E12, 0.06666666666666667]], "isOverall": false, "label": "login/login-261-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/check-100-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/imgs/Nexus_6.jpg-139-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/tether/dist/js/tether.min.js-118-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/imgs/sony_vaio_5.jpg-136-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-165-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/Lumia_1520.jpg-320-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/imgs/iphone_6.jpg-138-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-133-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/nexus1.jpg-312-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video-js.min.css-308-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/js/cart.js-154-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/check-157-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/deleteitem-140-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/check-108-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/jquery/dist/jquery.min.js-146-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/index.html-299-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video.min.js-148-success", "isController": false}, {"data": [[1.65001128E12, 0.06666666666666667]], "isOverall": false, "label": "Register/login-3-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/cart.html-142-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/view-99-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/galaxy_s6.jpg-319-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/imgs/Nexus_6.jpg-167-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/Samsung1.jpg-310-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/cart.html-109-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/iphone1.jpg-313-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/viewcart-127-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-161-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/check-316-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-134-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/imgs/iphone_6.jpg-168-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "ok/node_modules/video.js/dist/video.min.js-175-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/xperia_z5.jpg-323-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-164-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/config.json-156-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-130-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "purchasing/deletecart-170-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/check-124-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "ok/index.html-172-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-129-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/tether/dist/js/tether.min.js-151-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/entries-106-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/entries-317-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/bm.png-122-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/check-105-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/imgs/galaxy_s6.jpg-169-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/iphone_6.jpg-322-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-162-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/css/latofonts.css-113-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video-js.min.css-112-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/viewcart-125-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/css/latostyle.css-300-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/imgs/galaxy_s6.jpg-137-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-163-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "ok/node_modules/jquery/dist/jquery.min.js-174-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/HTC_M9.jpg-324-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/video.js/dist/video-js.min.css-147-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/config.json-123-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-135-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/css/latostyle.css-144-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "purchasing/deletecart-171-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/video.js/dist/video.min.js-302-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "add to cart/addtocart-103-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-131-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/jquery/dist/jquery.min.js-301-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/deleteitem-141-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-128-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/css/latofonts.css-309-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/check-159-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/viewcart-158-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/js/index.js-306-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/video.js/dist/video.min.js-116-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "add to cart/addtocart-79-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/sony_vaio_5.jpg-325-success", "isController": false}, {"data": [[1.65001128E12, 0.06666666666666667]], "isOverall": false, "label": "Register/signup-315-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/js/cart.js-120-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/front.jpg-314-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/viewcart-160-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/config.json-315-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/view-76-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/check-126-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "add to cart/addtocart-55-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "deleting item/view-166-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/imgs/Nexus_6.jpg-321-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "/check-60-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/view-132-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "openingcart/css/latostyle.css-114-success", "isController": false}, {"data": [[1.65001128E12, 0.016666666666666666]], "isOverall": false, "label": "Finish/check-318-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001128E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.9666666666666666, "minX": 1.65001128E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.65001128E12, 1.9666666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001128E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
