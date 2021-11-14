//const PlaceHolder = [
    //{id: "1", date: "november", peaktime: "12"},
    //{id: "2", date: "December", peaktime: "13"},
    //{id: "3", date: "january", peaktime: "17"},
    //{id: "4", date: "february", peaktime: "20"}, 
//]; 

//Fetch API
async function getData() {

    const apiUrl = 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=edpcJZECdLNrtxoA503TIHd8NtrhheSBW7lqT7vg'; 
    const apiData = await fetch(apiUrl);
    const apiJson = await apiData.json(); 
    let PlaceHolder = apiJson.slice(0, 3);
    console.log(PlaceHolder);


let Selected = PlaceHolder; 

const Padding = { top: 20, bottom: 20}
const Width = 600; 
const Height = 400 - Padding.top - Padding.bottom; 

const chartCont = d3.select('svg')
.attr('width', Width)
.attr('height', Height + Padding.top + Padding.bottom)
;

const chart = chartCont.append('g');

//Create Scale
const xScale = d3.scaleBand().rangeRound([0, Width]).padding(0.1); 
const yScale = d3.scaleLinear().range([Height, 0]); 

//Create Domains
xScale.domain(PlaceHolder.map((d) => d.date)); 
yScale.domain([0, d3.max(PlaceHolder, (d) => d.activeRegionNum)+1]); 

function render() {

    //Draw Bars
    chart.selectAll('.bar')
    .data(Selected, data =>  data.flrID)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => Height - yScale(data.activeRegionNum))
    .attr('x', data => xScale(data.date))
    .attr('y', data => yScale(data.activeRegionNum))
    ;

    //Remove Bars
    chart.selectAll('.bar')
    .data(Selected, data =>  data.flrID)
    .exit()
    .remove()
    ;

    //Draw Labels
    chart.selectAll('.label')
    .data(Selected, data =>  data.flrID)
    .enter()
    .append('text')
    .text(data => data.activeRegionNum)
    .attr('x', data => xScale(data.date) + (xScale.bandwidth()/2))
    .attr('y', data => yScale(data.activeRegionNum) -10)
    .attr('text-anchor', 'middle')
    .classed('label', true)
    ;

    //Remove Labels
    chart.selectAll('.label')
    .data(Selected, data =>  data.flrID)
    .exit()
    .remove()
    ;
}
;

//Draw X-axis 
chart.append('g')
.call(d3.axisBottom(xScale))
.attr('transform', `translate(0, ${Height})`)
;

//Interactive Implementation 
render();
let notSelected = []; 

const dateList = d3.select('#data')
.select('ul')
.select('li')
.data(PlaceHolder)
.enter()
.append('li')
;

//Add text

dateList.append('span')
.text(data => data.date)
;

//Check Button 

dateList.append('input')
.attr('type', 'checkbox')
.attr('checked', true)
.on('change', (events, info) => {
    if (notSelected.indexOf(info.flrID) === -1 ) {
        notSelected.push(info.flrID);
    }
    else{
        notSelected = notSelected.filter((flrID) => flrID !== info.flrID);
    }
    Selected = PlaceHolder.filter(
        (d) => notSelected.indexOf(d.flrID) === -1 
    );
    render();
})
;
}

getData();

//Bar Graph 2



