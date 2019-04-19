// margin and radius
var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var svg = d3.select("body")
    .append("svg")
    .style("cursor", "move");

svg.attr("viewBox", "220 10 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin");    

var zoom = d3.zoom()
    .on("zoom", function () {
        var transform = d3.zoomTransform(this);
        map.attr("transform", transform);
    });

svg.call(zoom);

var map = svg.append("g")
    .attr("class", "map");

//var pie = svg.append("g")
 //   .attr("class", "pie")

 /*arc generator
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

//pie generator
var pie = d3.pie()
    .sort(null)

// define svg

var svg1 = d3.select("body").append("svg1")
    .attr("width", width)
    .attr("height", height)
    .append(g) */

d3.queue()
    .defer(d3.json, "src/data/50m.json")
    .defer(d3.json, "src/data/population.json")
    .await(function (error, world, data) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            drawMap(world, data);
        }
    });

function drawMap(world, data) {
    // geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(130)
        .translate([width / 2, height / 1.5]);

    // geoPath projection
    var path = d3.geoPath().projection(projection);

    //colors for population metrics
    var color = d3.scaleThreshold()
        .domain([100000, 500000, 1000000, 2000000, 5000000, 1000000000])
        .range(["#8ec4cc", "#74c1cc", "#4eaab7", "#2c91a0", "#0f6d7a", "#075360"]);

    var features = topojson.feature(world, world.objects.countries).features;
    var populationById = {};

    data.forEach(function (d) {
        populationById[d.country] = {
            total: +d.total,
            hashtag1: d.hashtag1,
            hashtag2: d.hashtag2,
            hashtag3: d.hashtag3,
            hashtag4: d.hashtag4,
            hashtag5: d.hashtag5,
            hashtag6: d.hashtag6,
            hashtag7: d.hashtag7,
            hashtag8: d.hashtag8,
            hashtag9: d.hashtag9,
            hashtag10: d.hashtag10,
            hashtag1sentiment: d.hashtag1sentiment,
            hashtag2sentiment: d.hashtag2sentiment,
            hashtag3sentiment: d.hashtag3sentiment,
            hashtag4sentiment: d.hashtag4sentiment,
            hashtag5sentiment: d.hashtag5sentiment,
            hashtag6sentiment: d.hashtag6sentiment,
            hashtag7sentiment: d.hashtag7sentiment,
            hashtag8sentiment: d.hashtag8sentiment,
            hashtag9sentiment: d.hashtag9sentiment,
            hashtag10sentiment: d.hashtag10sentiment,
        
        }
    });
    features.forEach(function (d) {
        d.details = populationById[d.properties.name] ? populationById[d.properties.name] : {};
    });

    map.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("name", function (d) {
            return d.properties.name;
        })
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", path)
        .style("fill", function (d) {
            return d.details && d.details.total ? color(d.details.total) : undefined;
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("cursor", "pointer");

            d3.select(".country")
                .text(d.properties.name);

            d3.select(".hashtag1")
                .text(d.details && d.details.hashtag1  + "  ||  " + d.details.hashtag1sentiment + " Sentiment"||"Currently not available");

            d3.select(".hashtag2")
                .text(d.details && d.details.hashtag2  + "  ||  " + d.details.hashtag2sentiment + " Sentiment"||"Currently not available"|| "Currently not available");

            d3.select(".hashtag3")
                .text(d.details && d.details.hashtag3  + "  ||  " + d.details.hashtag3sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag4")
                .text(d.details && d.details.hashtag4  + "  ||  " + d.details.hashtag4sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag5")
                .text(d.details && d.details.hashtag5  + "  ||  " + d.details.hashtag5sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag6")
                .text(d.details && d.details.hashtag6  + "  ||  " + d.details.hashtag6sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag7")
                .text(d.details && d.details.hashtag7  + "  ||  " + d.details.hashtag7sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag8")
                .text(d.details && d.details.hashtag8  + "  ||  " + d.details.hashtag8sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag9")
                .text(d.details && d.details.hashtag9  + "  ||  " + d.details.hashtag9sentiment + " Sentiment"|| "Currently not available");

            d3.select(".hashtag10")
                .text(d.details && d.details.hashtag10  + "  ||  " + d.details.hashtag10sentiment + " Sentiment"|| "Currently not available");                                                                

            d3.select('.details')
                .style('visibility', "visible")
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style("stroke", null)
                .style("stroke-width", 0.25);

            d3.select('.details')
                .style('visibility', "hidden");
        });
}