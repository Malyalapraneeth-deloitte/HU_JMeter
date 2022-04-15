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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9576271186440678, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "openingcart/js/cart.js-120"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/config.json-315"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/nexus1.jpg-312"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/video.js/dist/video.min.js-116"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/galaxy_s6.jpg-137"], "isController": false}, {"data": [1.0, 500, 1500, "ok/node_modules/video.js/dist/video.min.js-175"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/css/latostyle.css-300"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/js/cart.js-154"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/cart.html-109"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/css/latofonts.css-113"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/tether/dist/js/tether.min.js-118"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/iphone_6.jpg-322"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-102"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/check-318"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-103"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/check-316"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/sony_vaio_5.jpg-136"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/config.json-156"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/cart.html-142"], "isController": false}, {"data": [1.0, 500, 1500, "/check-105"], "isController": false}, {"data": [1.0, 500, 1500, "ok/node_modules/jquery/dist/jquery.min.js-174"], "isController": false}, {"data": [1.0, 500, 1500, "/entries-106"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/css/latofonts.css-149"], "isController": false}, {"data": [1.0, 500, 1500, "/check-108"], "isController": false}, {"data": [1.0, 500, 1500, "/view-99"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/viewcart-160"], "isController": false}, {"data": [0.5, 500, 1500, "add to cart/addtocart-55"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/bm.png-311"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/galaxy_s6.jpg-169"], "isController": false}, {"data": [0.5, 500, 1500, "login/login-261"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/viewcart-158"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/jquery/dist/jquery.min.js-115"], "isController": false}, {"data": [0.5, 500, 1500, "Register/login-3"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/check-157"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/check-159"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/iphone_6.jpg-168"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/bm.png-155"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150"], "isController": false}, {"data": [1.0, 500, 1500, "purchasing/deletecart-170"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/tether/dist/js/tether.min.js-151"], "isController": false}, {"data": [1.0, 500, 1500, "purchasing/deletecart-171"], "isController": false}, {"data": [1.0, 500, 1500, "/check-100"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/entries-317"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/config.json-123"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/HTC_M9.jpg-324"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-163"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-164"], "isController": false}, {"data": [1.0, 500, 1500, "ok/index.html-172"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-161"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/imgs/Nexus_6.jpg-167"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-162"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/jquery/dist/jquery.min.js-146"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-165"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/view-166"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/Nexus_6.jpg-139"], "isController": false}, {"data": [1.0, 500, 1500, "Register/signup-315"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/deleteitem-140"], "isController": false}, {"data": [1.0, 500, 1500, "/view-76"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/deleteitem-141"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/front.jpg-314"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/xperia_z5.jpg-323"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-134"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/css/latostyle.css-144"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-133"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-135"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-79"], "isController": false}, {"data": [0.5, 500, 1500, "Finish/index.html-299"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-130"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/js/index.js-306"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-132"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-131"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/video.js/dist/video-js.min.css-112"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/Nexus_6.jpg-321"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/video.js/dist/video.min.js-148"], "isController": false}, {"data": [1.0, 500, 1500, "add to cart/addtocart-80"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/tether/dist/js/tether.min.js-304"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-129"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/view-128"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/css/latostyle.css-114"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/viewcart-127"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/viewcart-125"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303"], "isController": false}, {"data": [1.0, 500, 1500, "deleting item/node_modules/video.js/dist/video-js.min.css-147"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/Samsung1.jpg-310"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/Lumia_1520.jpg-320"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/video.js/dist/video-js.min.css-308"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/iphone1.jpg-313"], "isController": false}, {"data": [1.0, 500, 1500, "/check-77"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/check-126"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/sony_vaio_5.jpg-325"], "isController": false}, {"data": [1.0, 500, 1500, "/check-60"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/imgs/iphone_6.jpg-138"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/imgs/galaxy_s6.jpg-319"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/check-124"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/css/latofonts.css-309"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/video.js/dist/video.min.js-302"], "isController": false}, {"data": [1.0, 500, 1500, "openingcart/bm.png-122"], "isController": false}, {"data": [1.0, 500, 1500, "Finish/node_modules/jquery/dist/jquery.min.js-301"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 118, 0, 0.0, 267.18644067796595, 52, 1197, 264.0, 418.70000000000005, 850.1999999999999, 1195.67, 6.42456579735395, 193.3522502994501, 2.8301543699297653], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["openingcart/js/cart.js-120", 1, 0, 0.0, 253.0, 253, 253, 253.0, 253.0, 253.0, 253.0, 3.952569169960474, 11.38293601778656, 1.447474061264822], "isController": false}, {"data": ["deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-153", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 119.95442708333333, 8.08376736111111], "isController": false}, {"data": ["Finish/config.json-315", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 2.5178840361445785, 1.8668423694779117], "isController": false}, {"data": ["Finish/nexus1.jpg-312", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 129.22420058139534, 1.6011082848837208], "isController": false}, {"data": ["openingcart/node_modules/video.js/dist/video.min.js-116", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 1231.322281003937, 3.106545275590551], "isController": false}, {"data": ["openingcart/imgs/galaxy_s6.jpg-137", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 382.5745738636363, 1.4346590909090908], "isController": false}, {"data": ["ok/node_modules/video.js/dist/video.min.js-175", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 2303.6247702205883, 5.816291360294117], "isController": false}, {"data": ["Finish/css/latostyle.css-300", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 18.268453663793103, 7.122171336206896], "isController": false}, {"data": ["deleting item/js/cart.js-154", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 11.080524114173228, 1.5417384350393701], "isController": false}, {"data": ["openingcart/cart.html-109", 1, 0, 0.0, 425.0, 425, 425, 425.0, 425.0, 425.0, 425.0, 2.352941176470588, 13.591452205882353, 1.171875], "isController": false}, {"data": ["openingcart/css/latofonts.css-113", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 251.0, 3.9840637450199203, 5.197958167330677, 1.5407121513944224], "isController": false}, {"data": ["openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.css-111", 1, 0, 0.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 259.0, 3.8610038610038613, 12.125965250965251, 1.6288610038610039], "isController": false}, {"data": ["openingcart/node_modules/tether/dist/js/tether.min.js-118", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 152.75065104166669, 6.608072916666667], "isController": false}, {"data": ["Finish/imgs/iphone_6.jpg-322", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 290.0, 3.4482758620689653, 677.6771282327587, 1.4480064655172415], "isController": false}, {"data": ["openingcart/node_modules/bootstrap/dist/css/bootstrap.min.css-110", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 345.73974609375, 5.224609375], "isController": false}, {"data": ["openingcart/node_modules/bootstrap/dist/js/bootstrap.min.js-119", 1, 0, 0.0, 260.0, 260, 260, 260.0, 260.0, 260.0, 260.0, 3.8461538461538463, 59.61538461538461, 1.5474759615384615], "isController": false}, {"data": ["add to cart/addtocart-102", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 1.6002794251824817, 1.7143305200729926], "isController": false}, {"data": ["Finish/check-318", 1, 0, 0.0, 299.0, 299, 299, 299.0, 299.0, 299.0, 299.0, 3.3444816053511706, 2.3483225334448163, 1.5383308946488294], "isController": false}, {"data": ["add to cart/addtocart-103", 1, 0, 0.0, 306.0, 306, 306, 306.0, 306.0, 306.0, 306.0, 3.2679738562091503, 0.9797538807189543, 1.7361111111111112], "isController": false}, {"data": ["Finish/check-316", 1, 0, 0.0, 364.0, 364, 364, 364.0, 364.0, 364.0, 364.0, 2.7472527472527473, 1.204605940934066, 1.2797261332417582], "isController": false}, {"data": ["openingcart/imgs/sony_vaio_5.jpg-136", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 1453.1730276639344, 6.499743852459017], "isController": false}, {"data": ["deleting item/config.json-156", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 1.693203422053232, 1.7637535646387832], "isController": false}, {"data": ["deleting item/cart.html-142", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 93.12166908914729, 1.8244307170542635], "isController": false}, {"data": ["/check-105", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 1.6608960700757576, 1.7644708806818181], "isController": false}, {"data": ["ok/node_modules/jquery/dist/jquery.min.js-174", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 127.82000113224636, 1.4294610507246375], "isController": false}, {"data": ["/entries-106", 1, 0, 0.0, 297.0, 297, 297, 297.0, 297.0, 297.0, 297.0, 3.3670033670033668, 4.932133838383838, 1.2889309764309764], "isController": false}, {"data": ["deleting item/css/latofonts.css-149", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 23.100142045454547, 7.4928977272727275], "isController": false}, {"data": ["/check-108", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 331.0, 3.0211480362537766, 1.8557637839879153, 1.389610083081571], "isController": false}, {"data": ["/view-99", 1, 0, 0.0, 284.0, 284, 284, 284.0, 284.0, 284.0, 284.0, 3.5211267605633805, 2.658038072183099, 1.5542473591549297], "isController": false}, {"data": ["deleting item/node_modules/bootstrap-sweetalert/dist/sweetalert.css-145", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 65.0, 15.384615384615385, 49.78966346153846, 6.881009615384615], "isController": false}, {"data": ["openingcart/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-121", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 23.544773910984848, 1.5573212594696968], "isController": false}, {"data": ["deleting item/viewcart-160", 1, 0, 0.0, 299.0, 299, 299, 299.0, 299.0, 299.0, 299.0, 3.3444816053511706, 1.0222878344481605, 1.5905884197324416], "isController": false}, {"data": ["add to cart/addtocart-55", 1, 0, 0.0, 1197.0, 1197, 1197, 1197.0, 1197.0, 1197.0, 1197.0, 0.835421888053467, 0.25046339807852963, 0.44381787802840433], "isController": false}, {"data": ["Finish/bm.png-311", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 52.0, 19.230769230769234, 80.05934495192308, 7.868840144230769], "isController": false}, {"data": ["deleting item/imgs/galaxy_s6.jpg-169", 1, 0, 0.0, 355.0, 355, 355, 355.0, 355.0, 355.0, 355.0, 2.8169014084507045, 296.36058538732397, 1.1828785211267607], "isController": false}, {"data": ["login/login-261", 4, 0, 0.0, 898.75, 630, 1095, 935.0, 1095.0, 1095.0, 1095.0, 3.3585222502099077, 1.8309521935348445, 1.593166194374475], "isController": false}, {"data": ["deleting item/viewcart-158", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 1.6608960700757576, 1.7755681818181817], "isController": false}, {"data": ["deleting item/node_modules/bootstrap/dist/js/bootstrap.min.js-152", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 275.26403356481484, 7.921006944444445], "isController": false}, {"data": ["openingcart/node_modules/jquery/dist/jquery.min.js-115", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 76.0, 13.157894736842104, 462.646484375, 5.178351151315789], "isController": false}, {"data": ["Register/login-3", 4, 0, 0.0, 828.75, 577, 1190, 774.0, 1190.0, 1190.0, 1190.0, 3.273322422258593, 1.8556285801963994, 1.5503529050736498], "isController": false}, {"data": ["deleting item/check-157", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 1.6300243959107805, 1.7316740241635686], "isController": false}, {"data": ["deleting item/check-159", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 2.286931818181818, 1.672585227272727], "isController": false}, {"data": ["deleting item/imgs/iphone_6.jpg-168", 1, 0, 0.0, 284.0, 284, 284, 284.0, 284.0, 284.0, 284.0, 3.5211267605633805, 691.9942506602114, 1.4751595510563382], "isController": false}, {"data": ["deleting item/bm.png-155", 1, 0, 0.0, 257.0, 257, 257, 257.0, 257.0, 257.0, 257.0, 3.8910505836575875, 16.19877796692607, 1.5883390077821011], "isController": false}, {"data": ["deleting item/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-150", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 1078.7464488636363, 6.7323626893939394], "isController": false}, {"data": ["purchasing/deletecart-170", 1, 0, 0.0, 261.0, 261, 261, 261.0, 261.0, 261.0, 261.0, 3.8314176245210727, 1.6799868295019156, 1.8034602490421456], "isController": false}, {"data": ["deleting item/node_modules/tether/dist/js/tether.min.js-151", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 169.5601851851852, 7.8125], "isController": false}, {"data": ["purchasing/deletecart-171", 1, 0, 0.0, 342.0, 342, 342, 342.0, 342.0, 342.0, 342.0, 2.923976608187134, 0.9023209064327484, 1.3306377923976607], "isController": false}, {"data": ["/check-100", 1, 0, 0.0, 297.0, 297, 297, 297.0, 297.0, 297.0, 297.0, 3.3670033670033668, 2.2786458333333335, 1.5486900252525253], "isController": false}, {"data": ["Finish/entries-317", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 307.0, 3.257328990228013, 4.663324511400652, 1.2469462540716612], "isController": false}, {"data": ["openingcart/config.json-123", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 10.790215163934427, 7.188140368852459], "isController": false}, {"data": ["Finish/imgs/HTC_M9.jpg-324", 1, 0, 0.0, 135.0, 135, 135, 135.0, 135.0, 135.0, 135.0, 7.407407407407407, 703.370949074074, 3.0960648148148144], "isController": false}, {"data": ["deleting item/view-163", 1, 0, 0.0, 259.0, 259, 259, 259.0, 259.0, 259.0, 259.0, 3.8610038610038613, 1.6929597007722008, 1.7947635135135134], "isController": false}, {"data": ["deleting item/view-164", 1, 0, 0.0, 302.0, 302, 302, 302.0, 302.0, 302.0, 302.0, 3.3112582781456954, 2.7000983029801326, 1.4519091473509935], "isController": false}, {"data": ["ok/index.html-172", 1, 0, 0.0, 344.0, 344, 344, 344.0, 344.0, 344.0, 344.0, 2.9069767441860463, 15.079941860465118, 1.447810683139535], "isController": false}, {"data": ["deleting item/view-161", 1, 0, 0.0, 260.0, 260, 260, 260.0, 260.0, 260.0, 260.0, 3.8461538461538463, 1.6864483173076923, 1.7878605769230769], "isController": false}, {"data": ["deleting item/imgs/Nexus_6.jpg-167", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 1857.846119364754, 3.4259733606557377], "isController": false}, {"data": ["deleting item/view-162", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 1.6179946955719555, 1.715290590405904], "isController": false}, {"data": ["Finish/node_modules/bootstrap/dist/css/bootstrap.min.css-307", 1, 0, 0.0, 268.0, 268, 268, 268.0, 268.0, 268.0, 268.0, 3.7313432835820897, 103.93831623134328, 1.657969916044776], "isController": false}, {"data": ["deleting item/node_modules/jquery/dist/jquery.min.js-146", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 582.4869791666667, 6.982421875], "isController": false}, {"data": ["deleting item/view-165", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 2.5984757430069934, 1.533134833916084], "isController": false}, {"data": ["deleting item/view-166", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 2.4584790209790213, 1.533134833916084], "isController": false}, {"data": ["openingcart/imgs/Nexus_6.jpg-139", 1, 0, 0.0, 316.0, 316, 316, 316.0, 316.0, 316.0, 316.0, 3.1645569620253164, 717.2697043117089, 1.2423358386075949], "isController": false}, {"data": ["Register/signup-315", 4, 0, 0.0, 290.0, 278, 297, 292.5, 297.0, 297.0, 297.0, 7.797270955165692, 4.148011086744639, 3.719694200779727], "isController": false}, {"data": ["deleting item/deleteitem-140", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 1.6120461856617645, 1.7305261948529411], "isController": false}, {"data": ["/view-76", 1, 0, 0.0, 305.0, 305, 305, 305.0, 305.0, 305.0, 305.0, 3.278688524590164, 3.009733606557377, 1.447233606557377], "isController": false}, {"data": ["deleting item/deleteitem-141", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 1.6321569055944056, 1.6833752185314688], "isController": false}, {"data": ["Finish/imgs/front.jpg-314", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 324.85677083333337, 5.559895833333334], "isController": false}, {"data": ["Finish/imgs/xperia_z5.jpg-323", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 503.9202508960573, 1.5085965501792113], "isController": false}, {"data": ["openingcart/view-134", 1, 0, 0.0, 286.0, 286, 286, 286.0, 286.0, 286.0, 286.0, 3.4965034965034967, 2.834079982517483, 1.533134833916084], "isController": false}, {"data": ["deleting item/css/latostyle.css-144", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 18.934461805555557, 7.631655092592593], "isController": false}, {"data": ["openingcart/view-133", 1, 0, 0.0, 343.0, 343, 343, 343.0, 343.0, 343.0, 343.0, 2.9154518950437316, 2.417205721574344, 1.2783573250728861], "isController": false}, {"data": ["openingcart/view-135", 1, 0, 0.0, 289.0, 289, 289, 289.0, 289.0, 289.0, 289.0, 3.4602076124567476, 2.2234537197231834, 1.5172199394463668], "isController": false}, {"data": ["add to cart/addtocart-79", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 1.6239872685185184, 1.739728009259259], "isController": false}, {"data": ["Finish/index.html-299", 1, 0, 0.0, 753.0, 753, 753, 753.0, 753.0, 753.0, 753.0, 1.3280212483399734, 6.729592048472775, 0.6691982071713147], "isController": false}, {"data": ["openingcart/view-130", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 262.0, 3.8167938931297707, 1.6735746660305342, 1.7742127862595418], "isController": false}, {"data": ["Finish/js/index.js-306", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 55.44295400943396, 7.425560141509434], "isController": false}, {"data": ["openingcart/view-132", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 3.0370020604395602, 1.6061412545787546], "isController": false}, {"data": ["openingcart/view-131", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 1.6300243959107805, 1.7280436802973977], "isController": false}, {"data": ["openingcart/node_modules/video.js/dist/video-js.min.css-112", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 178.98380055147058, 6.060431985294117], "isController": false}, {"data": ["Finish/imgs/Nexus_6.jpg-321", 1, 0, 0.0, 418.0, 418, 418, 418.0, 418.0, 418.0, 418.0, 2.3923444976076556, 542.2421688098086, 1.0022615131578947], "isController": false}, {"data": ["deleting item/node_modules/video.js/dist/video.min.js-148", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 2341.9280550373132, 6.267490671641791], "isController": false}, {"data": ["add to cart/addtocart-80", 1, 0, 0.0, 337.0, 337, 337, 337.0, 337.0, 337.0, 337.0, 2.967359050445104, 0.889628152818991, 1.5764094955489614], "isController": false}, {"data": ["Finish/node_modules/tether/dist/js/tether.min.js-304", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 148.4375, 6.931992827868853], "isController": false}, {"data": ["Finish/node_modules/bootstrap/dist/js/bootstrap.min.js-305", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 279.296875, 7.794744318181818], "isController": false}, {"data": ["deleting item/node_modules/bootstrap/dist/css/bootstrap.min.css-143", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 395.39620535714283, 6.333705357142857], "isController": false}, {"data": ["openingcart/view-129", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 1.667211264258555, 1.7674667300380227], "isController": false}, {"data": ["openingcart/view-128", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 1.6995215600775193, 1.80171996124031], "isController": false}, {"data": ["openingcart/css/latostyle.css-114", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 15.539336622807017, 6.784539473684211], "isController": false}, {"data": ["openingcart/viewcart-127", 1, 0, 0.0, 303.0, 303, 303, 303.0, 303.0, 303.0, 303.0, 3.3003300330033003, 1.0087922854785478, 1.5695905528052805], "isController": false}, {"data": ["openingcart/viewcart-125", 1, 0, 0.0, 262.0, 262, 262, 262.0, 262.0, 262.0, 262.0, 3.8167938931297707, 1.6735746660305342, 1.78912213740458], "isController": false}, {"data": ["openingcart/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-117", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 1035.8780570652173, 6.071671195652174], "isController": false}, {"data": ["Finish/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-303", 1, 0, 0.0, 101.0, 101, 101, 101.0, 101.0, 101.0, 101.0, 9.900990099009901, 702.3514851485148, 4.409034653465346], "isController": false}, {"data": ["deleting item/node_modules/video.js/dist/video-js.min.css-147", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 170.27064732142856, 6.249999999999999], "isController": false}, {"data": ["Finish/Samsung1.jpg-310", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 450.5045572916667, 6.917317708333334], "isController": false}, {"data": ["Finish/imgs/Lumia_1520.jpg-320", 1, 0, 0.0, 289.0, 289, 289, 289.0, 289.0, 289.0, 289.0, 3.4602076124567476, 491.70766652249137, 1.4597750865051904], "isController": false}, {"data": ["Finish/node_modules/video.js/dist/video-js.min.css-308", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 217.79087611607142, 7.829938616071429], "isController": false}, {"data": ["Finish/iphone1.jpg-313", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 549.6944304435484, 6.678427419354839], "isController": false}, {"data": ["/check-77", 1, 0, 0.0, 334.0, 334, 334, 334.0, 334.0, 334.0, 334.0, 2.9940119760479043, 1.4853106287425148, 1.3771285553892214], "isController": false}, {"data": ["openingcart/check-126", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 1.984402802491103, 1.6368716637010674], "isController": false}, {"data": ["Finish/imgs/sony_vaio_5.jpg-325", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 324.701665521978, 1.5489068223443223], "isController": false}, {"data": ["/check-60", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 290.0, 3.4482758620689653, 2.1484375, 1.586072198275862], "isController": false}, {"data": ["openingcart/imgs/iphone_6.jpg-138", 1, 0, 0.0, 89.0, 89, 89, 89.0, 89.0, 89.0, 89.0, 11.235955056179774, 2208.161429073034, 4.421962780898877], "isController": false}, {"data": ["Finish/imgs/galaxy_s6.jpg-319", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 78.0, 12.82051282051282, 1348.8206129807693, 5.396133814102564], "isController": false}, {"data": ["openingcart/check-124", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 1.6995215600775193, 1.8055050872093024], "isController": false}, {"data": ["Finish/css/latofonts.css-309", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 25.722287735849058, 7.79407429245283], "isController": false}, {"data": ["Finish/node_modules/video.js/dist/video.min.js-302", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 1598.353794642857, 4.294882015306122], "isController": false}, {"data": ["openingcart/bm.png-122", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 77.09418402777779, 7.08912037037037], "isController": false}, {"data": ["Finish/node_modules/jquery/dist/jquery.min.js-301", 1, 0, 0.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 94.0, 10.638297872340425, 369.9613530585106, 4.467253989361702], "isController": false}]}, function(index, item){
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
