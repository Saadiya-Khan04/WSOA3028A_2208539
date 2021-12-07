async function getData() {

    const apiUrl = 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=edpcJZECdLNrtxoA503TIHd8NtrhheSBW7lqT7vg'; 
    const apiData = await fetch(apiUrl);
    const apiJson = await apiData.json(); 
    let PlaceHolder = apiJson.slice(0, 5);
    console.log(PlaceHolder);


let Selected = PlaceHolder; 

const Padding = { top: 20, bottom: 20}
const Width = 600; 
const Height = 400 - Padding.top - Padding.bottom; 

const chartCont = d3.select('svg')
.attr('width', Width)
.attr('height', Height + Padding.top + Padding.bottom ) 
;

const chart = chartCont.append('g');

//Create Scale
const xScale = d3.scaleBand().rangeRound([0, Width]).padding(0.1); 
const yScale = d3.scaleLinear().range([Height, 0]); 

//Create Domains
xScale.domain(PlaceHolder.map((d) => d.beginTime)); 
yScale.domain([0, d3.max(PlaceHolder, (d) => d.activeRegionNum)+1]); 



    //Draw Bars
    chart.selectAll('.bar')
    .data(Selected, data =>  data.flrID)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => Height - yScale(data.activeRegionNum))
    .attr('x', data => xScale(data.beginTime))
    .attr('y', data => yScale(data.activeRegionNum))
    ;

   

    //Draw Labels
    chart.selectAll('.label')
    .data(Selected, data =>  data.flrID)
    .enter()
    .append('text')
    .text(data => data.activeRegionNum)
    .attr('x', data => xScale(data.beginTime) + (xScale.bandwidth()/2))
    .attr('y', data => yScale(data.activeRegionNum) -10)
    .attr('text-anchor', 'middle')
    .classed('label', true)
    ;

//Draw X-axis 
chart.append('g')
.call(d3.axisBottom(xScale))
.attr('transform', `translate(0, ${Height})`)
;}

getData();