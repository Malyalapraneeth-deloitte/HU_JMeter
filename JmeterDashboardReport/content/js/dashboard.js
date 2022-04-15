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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9576271186440678, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "openingcart/js/cart.js-120"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/config.json-315"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/nexus1.jpg-312"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/video.js/dist/video.min.js-116"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/galaxy_s6.jpg-137"], "isController": false}, {"data": [1.0, 500, 1500, "ok/node_modules/video.js/dist/video.min.js-175"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/css/latostyle.css-300"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/js/cart.js-154"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/cart.html-109"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/css/latofonts.css-113"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/tether/dist/js/tether.min.js-118"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/iphone_6.jpg-322"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119"], "isController": false}, {"data": [0.5, 500, 1500, "add to cart/addtocart-102"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/check-318"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-103"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/check-316"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/sony_vaio_5.jpg-136"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/config.json-156"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/cart.html-142"], "isController": false}, {"data": [1.0, 500, 1500, "/check-105"], "isController": false}, {"data": [0.5, 500, 1500, "ok/node_modules/jquery/dist/jquery.min.js-174"], "isController": false}, {"data": [1.0, 500, 1500, "/entries-106"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/css/latofonts.css-149"], "isController": false}, {"data": [1.0, 500, 1500, "/check-108"], "isController": false}, {"data": [1.0, 500, 1500, "/view-99"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/viewcart-160"], "isController": false}, {"data": [0.5, 500, 1500, "add to cart/addtocart-55"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/bm.png-311"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/galaxy_s6.jpg-169"], "isController": false}, {"data": [0.625, 500, 1500, "login/login-261"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/viewcart-158"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/jquery/dist/jquery.min.js-115"], "isController": false}, {"data": [0.75, 500, 1500, "Register/login-3"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/check-157"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/check-159"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/iphone_6.jpg-168"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/bm.png-155"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150"], "isController": false}, {"data": [1.0, 500, 1500, "purchasing/deletecart-170"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/tether/dist/js/tether.min.js-151"], "isController": false}, {"data": [1.0, 500, 1500, "purchasing/deletecart-171"], "isController": false}, {"data": [1.0, 500, 1500, "/check-100"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/entries-317"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/config.json-123"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/HTC_M9.jpg-324"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-163"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-164"], "isController": false}, {"data": [1.0, 500, 1500, "ok/index.html-172"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-161"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/Nexus_6.jpg-167"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-162"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/jquery/dist/jquery.min.js-146"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-165"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-166"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/Nexus_6.jpg-139"], "isController": false}, {"data": [1.0, 500, 1500, "Register/signup-315"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/deleteitem-140"], "isController": false}, {"data": [1.0, 500, 1500, "/view-76"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/deleteitem-141"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/front.jpg-314"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/xperia_z5.jpg-323"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-134"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/css/latostyle.css-144"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-133"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-135"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-79"], "isController": false}, {"data": [0.5, 500, 1500, "Finish/index.html-299"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-130"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/js/index.js-306"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-132"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-131"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/video.js/dist/video-js.min.css-112"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/Nexus_6.jpg-321"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/video.js/dist/video.min.js-148"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-80"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/tether/dist/js/tether.min.js-304"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-129"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-128"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/css/latostyle.css-114"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/viewcart-127"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/viewcart-125"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/video.js/dist/video-js.min.css-147"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/Samsung1.jpg-310"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/Lumia_1520.jpg-320"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/video.js/dist/video-js.min.css-308"], "isController": false}, {"data": [0.5, 500, 1500, "Finish/iphone1.jpg-313"], "isController": false}, {"data": [1.0, 500, 1500, "/check-77"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/check-126"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/sony_vaio_5.jpg-325"], "isController": false}, {"data": [1.0, 500, 1500, "/check-60"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/iphone_6.jpg-138"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/galaxy_s6.jpg-319"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/check-124"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/css/latofonts.css-309"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/video.js/dist/video.min.js-302"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/bm.png-122"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/jquery/dist/jquery.min.js-301"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 118, 0, 0.0, 289.1864406779659, 50, 871, 276.5, 483.70000000000005, 544.9999999999995, 870.81, 5.476654599461616, 168.12811107630188, 2.4120359492481205], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["openingcart/js/cart.js-120", 1, 0, 0.0, 317.0, 317, 317, 317.0, 317.0, 317.0, 317.0, 3.1545741324921135, 29.090472200315457, 1.155239550473186], "isController": false}, {"data": ["deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", 1, 0, 0.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 259.0, 3.8610038610038613, 63.90640082046332, 1.6854186776061775], "isController": false}, {"data": ["Finish/config.json-315", 1, 0, 0.0, 195.0, 195, 195, 195.0, 195.0, 195.0, 195.0, 5.128205128205129, 2.1584535256410255, 2.3838141025641026], "isController": false}, {"data": ["Finish/nexus1.jpg-312", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 444.58333333333337, 5.5078125], "isController": false}, {"data": ["openingcart/node_modules/video.js/dist/video.min.js-116", 1, 0, 0.0, 91.0, 91, 91, 91.0, 91.0, 91.0, 91.0, 10.989010989010989, 1722.6991758241759, 4.335508241758242], "isController": false}, {"data": ["openingcart/imgs/galaxy_s6.jpg-137", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 262.0, 3.8167938931297707, 401.5572817270992, 1.505844465648855], "isController": false}, {"data": ["ok/node_modules/video.js/dist/video.min.js-175", 1, 0, 0.0, 415.0, 415, 415, 415.0, 415.0, 415.0, 415.0, 2.4096385542168677, 376.67780496987956, 0.953030873493976], "isController": false}, {"data": ["Finish/css/latostyle.css-300", 1, 0, 0.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 259.0, 3.8610038610038613, 3.985430743243243, 1.5949263996138996], "isController": false}, {"data": ["deleting item/js/cart.js-154", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 251.0, 3.9840637450199203, 36.73975971115538, 1.5601655876494023], "isController": false}, {"data": ["openingcart/cart.html-109", 1, 0, 0.0, 389.0, 389, 389, 389.0, 389.0, 389.0, 389.0, 2.5706940874035986, 61.76192962724936, 1.2803261568123392], "isController": false}, {"data": ["openingcart/css/latofonts.css-113", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 22.042410714285715, 6.138392857142857], "isController": false}, {"data": ["openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", 1, 0, 0.0, 255.0, 255, 255, 255.0, 255.0, 255.0, 255.0, 3.9215686274509802, 12.446384803921568, 1.6544117647058822], "isController": false}, {"data": ["openingcart/node_modules/tether/dist/js/tether.min.js-118", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 32.751596102150536, 1.4210909498207884], "isController": false}, {"data": ["Finish/imgs/iphone_6.jpg-322", 1, 0, 0.0, 318.0, 318, 318, 318.0, 318.0, 318.0, 318.0, 3.1446540880503147, 618.007443985849, 1.3205090408805031], "isController": false}, {"data": ["openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", 1, 0, 0.0, 309.0, 309, 309, 309.0, 309.0, 309.0, 309.0, 3.236245954692557, 90.0049302184466, 1.3526496763754046], "isController": false}, {"data": ["openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", 1, 0, 0.0, 288.0, 288, 288, 288.0, 288.0, 288.0, 288.0, 3.472222222222222, 52.00873480902778, 1.3970269097222223], "isController": false}, {"data": ["add to cart/addtocart-102", 1, 0, 0.0, 524.0, 524, 524, 524.0, 524.0, 524.0, 524.0, 1.9083969465648853, 0.8367873330152671, 0.8964247375954199], "isController": false}, {"data": ["Finish/check-318", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 1.7431115591397848, 1.648605510752688], "isController": false}, {"data": ["add to cart/addtocart-103", 1, 0, 0.0, 355.0, 355, 355, 355.0, 355.0, 355.0, 355.0, 2.8169014084507045, 0.8445202464788732, 1.4964788732394367], "isController": false}, {"data": ["Finish/check-316", 1, 0, 0.0, 490.0, 490, 490, 490.0, 490.0, 490.0, 490.0, 2.0408163265306123, 0.8948501275510204, 0.9506536989795918], "isController": false}, {"data": ["openingcart/imgs/sony_vaio_5.jpg-136", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 1343.084161931818, 6.007339015151515], "isController": false}, {"data": ["deleting item/config.json-156", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 1.7993356299212597, 1.8262487696850394], "isController": false}, {"data": ["deleting item/cart.html-142", 1, 0, 0.0, 265.0, 265, 265, 265.0, 265.0, 265.0, 265.0, 3.7735849056603774, 21.554392688679243, 1.7762382075471697], "isController": false}, {"data": ["/check-105", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 1.6995215600775193, 1.8055050872093024], "isController": false}, {"data": ["ok/node_modules/jquery/dist/jquery.min.js-174", 1, 0, 0.0, 537.0, 537, 537, 537.0, 537.0, 537.0, 537.0, 1.86219739292365, 158.1358385707635, 0.7346950651769087], "isController": false}, {"data": ["/entries-106", 1, 0, 0.0, 349.0, 349, 349, 349.0, 349.0, 349.0, 349.0, 2.865329512893983, 4.370746776504299, 1.096883954154728], "isController": false}, {"data": ["deleting item/css/latofonts.css-149", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 52.0, 19.230769230769234, 25.597205528846153, 7.925180288461539], "isController": false}, {"data": ["/check-108", 1, 0, 0.0, 382.0, 382, 382, 382.0, 382.0, 382.0, 382.0, 2.617801047120419, 1.3421343259162304, 1.2040862238219896], "isController": false}, {"data": ["/view-99", 1, 0, 0.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 282.0, 3.5460992907801416, 2.1989971187943262, 1.5652703900709222], "isController": false}, {"data": ["deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", 1, 0, 0.0, 247.0, 247, 247, 247.0, 247.0, 247.0, 247.0, 4.048582995951417, 12.924626771255062, 1.810792004048583], "isController": false}, {"data": ["openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", 1, 0, 0.0, 420.0, 420, 420, 420.0, 420.0, 420.0, 420.0, 2.3809523809523814, 14.587983630952381, 0.9788876488095238], "isController": false}, {"data": ["deleting item/viewcart-160", 1, 0, 0.0, 310.0, 310, 310, 310.0, 310.0, 310.0, 310.0, 3.225806451612903, 2.063382056451613, 1.534148185483871], "isController": false}, {"data": ["add to cart/addtocart-55", 1, 0, 0.0, 870.0, 870, 870, 870.0, 870.0, 870.0, 870.0, 1.1494252873563218, 0.3446030890804598, 0.610632183908046], "isController": false}, {"data": ["Finish/bm.png-311", 1, 0, 0.0, 299.0, 299, 299, 299.0, 299.0, 299.0, 299.0, 3.3444816053511706, 13.923364339464884, 1.3684939381270904], "isController": false}, {"data": ["deleting item/imgs/galaxy_s6.jpg-169", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 79.0, 12.658227848101266, 1331.746934335443, 5.315466772151899], "isController": false}, {"data": ["login/login-261", 4, 0, 0.0, 633.25, 374, 822, 668.5, 822.0, 822.0, 822.0, 4.291845493562231, 2.702311896459227, 2.0400935488197423], "isController": false}, {"data": ["deleting item/viewcart-158", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 1.6179946955719555, 1.7297047970479704], "isController": false}, {"data": ["deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", 1, 0, 0.0, 260.0, 260, 260, 260.0, 260.0, 260.0, 260.0, 3.8461538461538463, 57.99654447115385, 1.6451322115384615], "isController": false}, {"data": ["openingcart/node_modules/jquery/dist/jquery.min.js-115", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 130.31322337962962, 1.4576099537037035], "isController": false}, {"data": ["Register/login-3", 4, 0, 0.0, 615.0, 409, 871, 590.0, 871.0, 871.0, 871.0, 3.8204393505253105, 2.1779115926456543, 1.8094854345749762], "isController": false}, {"data": ["deleting item/check-157", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 262.0, 3.8167938931297707, 1.6735746660305342, 1.7779401240458015], "isController": false}, {"data": ["deleting item/check-159", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 2.23664314516129, 1.648605510752688], "isController": false}, {"data": ["deleting item/imgs/iphone_6.jpg-168", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 730.5812906598512, 1.5574175185873604], "isController": false}, {"data": ["deleting item/bm.png-155", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 50.0, 20.0, 83.33984375, 8.1640625], "isController": false}, {"data": ["deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 1074.6330492424242, 6.7323626893939394], "isController": false}, {"data": ["purchasing/deletecart-170", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 1.712799072265625, 1.83868408203125], "isController": false}, {"data": ["deleting item/node_modules/tether/dist/js/tether.min.js-151", 1, 0, 0.0, 250.0, 250, 250, 250.0, 250.0, 250.0, 250.0, 4.0, 36.15234375, 1.6875], "isController": false}, {"data": ["purchasing/deletecart-171", 1, 0, 0.0, 382.0, 382, 382, 382.0, 382.0, 382.0, 382.0, 2.617801047120419, 0.8078370418848168, 1.1913039921465969], "isController": false}, {"data": ["/check-100", 1, 0, 0.0, 374.0, 374, 374, 374.0, 374.0, 374.0, 374.0, 2.6737967914438503, 1.919180314171123, 1.2298420788770053], "isController": false}, {"data": ["Finish/entries-317", 1, 0, 0.0, 300.0, 300, 300, 300.0, 300.0, 300.0, 300.0, 3.3333333333333335, 5.4296875, 1.2760416666666667], "isController": false}, {"data": ["openingcart/config.json-123", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 1.8846575184501844, 1.6179946955719555], "isController": false}, {"data": ["Finish/imgs/HTC_M9.jpg-324", 1, 0, 0.0, 329.0, 329, 329, 329.0, 329.0, 329.0, 329.0, 3.0395136778115504, 288.61725873860183, 1.2704217325227962], "isController": false}, {"data": ["deleting item/view-163", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 1.6002794251824817, 1.6965100364963501], "isController": false}, {"data": ["deleting item/view-164", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 2.8624603713768115, 1.588683197463768], "isController": false}, {"data": ["ok/index.html-172", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 24.678132971938776, 2.5410554846938775], "isController": false}, {"data": ["deleting item/view-161", 1, 0, 0.0, 268.0, 268, 268, 268.0, 268.0, 268.0, 268.0, 3.7313432835820897, 1.6361065764925373, 1.7344916044776117], "isController": false}, {"data": ["deleting item/imgs/Nexus_6.jpg-167", 1, 0, 0.0, 347.0, 347, 347, 347.0, 347.0, 347.0, 347.0, 2.881844380403458, 653.1908546469741, 1.204520893371758], "isController": false}, {"data": ["deleting item/view-162", 1, 0, 0.0, 261.0, 261, 261, 261.0, 261.0, 261.0, 261.0, 3.8314176245210727, 1.6799868295019156, 1.7810105363984674], "isController": false}, {"data": ["Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", 1, 0, 0.0, 354.0, 354, 354, 354.0, 354.0, 354.0, 354.0, 2.824858757062147, 78.08086158192091, 1.255186264124294], "isController": false}, {"data": ["deleting item/node_modules/jquery/dist/jquery.min.js-146", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 582.0963541666667, 6.982421875], "isController": false}, {"data": ["deleting item/view-165", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 2.5006975446428568, 1.5659877232142856], "isController": false}, {"data": ["deleting item/view-166", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 2.2301136363636362, 1.594460227272727], "isController": false}, {"data": ["openingcart/imgs/Nexus_6.jpg-139", 1, 0, 0.0, 318.0, 318, 318, 318.0, 318.0, 318.0, 318.0, 3.1446540880503147, 712.758574095912, 1.2345224056603774], "isController": false}, {"data": ["Register/signup-315", 4, 0, 0.0, 274.75, 265, 284, 275.0, 284.0, 284.0, 284.0, 8.113590263691684, 4.494564528397566, 3.8389008620689657], "isController": false}, {"data": ["deleting item/deleteitem-140", 1, 0, 0.0, 288.0, 288, 288, 288.0, 288.0, 288.0, 288.0, 3.472222222222222, 1.5224880642361112, 1.6343858506944446], "isController": false}, {"data": ["/view-76", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 2.5292266187050356, 1.5877922661870503], "isController": false}, {"data": ["deleting item/deleteitem-141", 1, 0, 0.0, 309.0, 309, 309, 309.0, 309.0, 309.0, 309.0, 3.236245954692557, 0.9986852750809062, 1.5580754449838188], "isController": false}, {"data": ["Finish/imgs/front.jpg-314", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 170.3794252622378, 2.9160292832167833], "isController": false}, {"data": ["Finish/imgs/xperia_z5.jpg-323", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 78.0, 12.82051282051282, 1802.4839743589744, 5.396133814102564], "isController": false}, {"data": ["openingcart/view-134", 1, 0, 0.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 282.0, 3.5460992907801416, 3.0335771276595747, 1.5548814273049647], "isController": false}, {"data": ["deleting item/css/latostyle.css-144", 1, 0, 0.0, 244.0, 244, 244, 244.0, 244.0, 244.0, 244.0, 4.0983606557377055, 4.058337602459017, 1.6889728483606559], "isController": false}, {"data": ["openingcart/view-133", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 2.6516625889679712, 1.5604148131672597], "isController": false}, {"data": ["openingcart/view-135", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 2.28214605734767, 1.5716005824372759], "isController": false}, {"data": ["add to cart/addtocart-79", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 307.0, 3.257328990228013, 1.4282624185667752, 1.5300539495114007], "isController": false}, {"data": ["Finish/index.html-299", 1, 0, 0.0, 530.0, 530, 530, 530.0, 530.0, 530.0, 530.0, 1.8867924528301887, 9.218381485849056, 0.9507665094339622], "isController": false}, {"data": ["openingcart/view-130", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 262.0, 3.8167938931297707, 1.6735746660305342, 1.7742127862595418], "isController": false}, {"data": ["Finish/js/index.js-306", 1, 0, 0.0, 255.0, 255, 255, 255.0, 255.0, 255.0, 255.0, 3.9215686274509802, 11.056219362745098, 1.5433517156862744], "isController": false}, {"data": ["openingcart/view-132", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 2.797625667259786, 1.5604148131672597], "isController": false}, {"data": ["openingcart/view-131", 1, 0, 0.0, 293.0, 293, 293, 293.0, 293.0, 293.0, 293.0, 3.4129692832764507, 1.4965070392491469, 1.5864974402730376], "isController": false}, {"data": ["openingcart/node_modules/video.js/dist/video-js.min.css-112", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 48.816359186746986, 1.6550577309236947], "isController": false}, {"data": ["Finish/imgs/Nexus_6.jpg-321", 1, 0, 0.0, 396.0, 396, 396, 396.0, 396.0, 396.0, 396.0, 2.5252525252525255, 572.3667337436868, 1.0579427083333333], "isController": false}, {"data": ["deleting item/node_modules/video.js/dist/video.min.js-148", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 2169.745551215278, 5.832248263888889], "isController": false}, {"data": ["add to cart/addtocart-80", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 0.9168339067278287, 1.6246177370030581], "isController": false}, {"data": ["Finish/node_modules/tether/dist/js/tether.min.js-304", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 162.58908991228068, 7.418448464912281], "isController": false}, {"data": ["Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 133.71930803571428, 3.827776227678571], "isController": false}, {"data": ["deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 533.0741450471698, 8.365271226415095], "isController": false}, {"data": ["openingcart/view-129", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 266.0, 3.7593984962406015, 1.648408129699248, 1.747532894736842], "isController": false}, {"data": ["openingcart/view-128", 1, 0, 0.0, 268.0, 268, 268, 268.0, 268.0, 268.0, 268.0, 3.7313432835820897, 1.6361065764925373, 1.7344916044776117], "isController": false}, {"data": ["openingcart/css/latostyle.css-114", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 13.770946557971014, 5.604619565217391], "isController": false}, {"data": ["openingcart/viewcart-127", 1, 0, 0.0, 305.0, 305, 305, 305.0, 305.0, 305.0, 305.0, 3.278688524590164, 2.2797131147540983, 1.559298155737705], "isController": false}, {"data": ["openingcart/viewcart-125", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 1.712799072265625, 1.8310546875], "isController": false}, {"data": ["openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", 1, 0, 0.0, 304.0, 304, 304, 304.0, 304.0, 304.0, 304.0, 3.289473684210526, 234.2882658305921, 1.3781095805921053], "isController": false}, {"data": ["Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", 1, 0, 0.0, 293.0, 293, 293, 293.0, 293.0, 293.0, 293.0, 3.4129692832764507, 242.62745307167236, 1.5198378839590445], "isController": false}, {"data": ["deleting item/node_modules/video.js/dist/video-js.min.css-147", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 47.18538032945736, 1.695736434108527], "isController": false}, {"data": ["Finish/Samsung1.jpg-310", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 397.561465992647, 6.103515625], "isController": false}, {"data": ["Finish/imgs/Lumia_1520.jpg-320", 1, 0, 0.0, 85.0, 85, 85, 85.0, 85.0, 85.0, 85.0, 11.76470588235294, 1671.8060661764705, 4.963235294117647], "isController": false}, {"data": ["Finish/node_modules/video.js/dist/video-js.min.css-308", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 178.78274356617646, 6.448184742647058], "isController": false}, {"data": ["Finish/iphone1.jpg-313", 1, 0, 0.0, 516.0, 516, 516, 516.0, 516.0, 516.0, 516.0, 1.937984496124031, 66.04855559593022, 0.8024467054263565], "isController": false}, {"data": ["/check-77", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 1.9425485108303246, 1.6605087996389891], "isController": false}, {"data": ["openingcart/check-126", 1, 0, 0.0, 311.0, 311, 311, 311.0, 311.0, 311.0, 311.0, 3.215434083601286, 2.238871583601286, 1.478974075562701], "isController": false}, {"data": ["Finish/imgs/sony_vaio_5.jpg-325", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 318.86170750899277, 1.521048785971223], "isController": false}, {"data": ["/check-60", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 2.1003274356617645, 1.6910328584558822], "isController": false}, {"data": ["openingcart/imgs/iphone_6.jpg-138", 1, 0, 0.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 190.0, 5.263157894736842, 1034.349300986842, 2.071340460526316], "isController": false}, {"data": ["Finish/imgs/galaxy_s6.jpg-319", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 389.6592881944444, 1.5588831018518519], "isController": false}, {"data": ["openingcart/check-124", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 1.5799386160714284, 1.6636439732142856], "isController": false}, {"data": ["Finish/css/latofonts.css-309", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 4.723837209302325, 1.6011082848837208], "isController": false}, {"data": ["Finish/node_modules/video.js/dist/video.min.js-302", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 1295.478757747934, 3.4784994834710745], "isController": false}, {"data": ["openingcart/bm.png-122", 1, 0, 0.0, 408.0, 408, 408, 408.0, 408.0, 408.0, 408.0, 2.450980392156863, 10.203642003676471, 0.9382659313725491], "isController": false}, {"data": ["Finish/node_modules/jquery/dist/jquery.min.js-301", 1, 0, 0.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 94.0, 10.638297872340425, 371.44697473404256, 4.467253989361702], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 118, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
