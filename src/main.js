import '../src/SCSS/base.scss';
import * as d3 from "d3";
import movies from './movies.json';

const data = [45, 67, 96, 84, 41];
let movieData = [];
movieData = Object.entries(movies);
const rectWidth = 50;

const colors = {
  Action: "#ffc8f0",
  Comedy: "#cbf2bd",
  Animation: "#afe9ff",
  Drama: "#ffb09e",
  Other: "#FFF2B4",
}

const petals = {
  G: "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0",
  PG: "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
  "PG-13": "M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0",
  R: "M0 0 C50 25 50 75 0 100 C-50 75 -50 25 0 0",
}

const pathWidth = 120
const pathHeight = 120
const perRow = 7
const svgHeight = (Math.ceil(movieData.length / perRow) + 0.5) * pathWidth

const calculateGridPos = (i) => {
  return [(i % perRow + 0.5) * pathWidth, (Math.floor(i / perRow) + 0.5) * pathWidth]
}

function drawChart() {
  const htmlSvg = `
    <svg id='svgCont' width=${rectWidth * data.length} height=100 style='border: 1px dashed' >
    </svg>
  `;
  const container = document.querySelector('div.chart_container');
  container.innerHTML = htmlSvg;

  const svg = d3.select(container).select('#svgCont');
  const selectAll = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * rectWidth)
    .attr('y', (d, i) => 100 - d)
    .attr('height', (d) => d)
    .attr('width', rectWidth)
    .attr('stroke-width', 3)
    .attr('stroke', 'plum')
    .attr('fill', 'pink')
};


function drawPetals() {

  const htmlSvg = `<svg id="svgCont" width=${perRow * pathWidth} height=${svgHeight} style='border: 1px dashed'></svg>`;

  const container = document.querySelector('div.petals_container');
  container.innerHTML = htmlSvg;

  const svg = d3.select(container).select('#svgCont');

  const selectAll = svg.selectAll('path')
    .data(movieData).enter().append('path')
    .attr('d', (d) => petals[d[1].Rated])
    .attr('transform', (d,i) => `translate(${calculateGridPos(i)}) scale(${d[1].imdbRating * 0.15})`)
    .attr('fill', (d) => colors[d[1].Genre.split(',')[0]] || colors.Other)
    .attr('fill-opacity', 0.5)
    .attr('stroke', (d) => colors[d[1].Genre.split(',')[0]] || colors.Other)

}

const data2 = [88, 34, 23, 58, 75, 10, 45, 98];

function drawScaledChart() {
  const htmlSvg = `
  <svg id='container' width=${(rectWidth + 20*2) * data2.length} height=200 style='border: 1px dashed' >
  </svg>
  `;
  const container = document.querySelector('div.scaledChart_container');
  container.innerHTML = htmlSvg;

  const contHeight = 200;
  const padding = 0.2;

  const xScale = d3.scaleBand()
    .domain(Object.keys(data2).map(x => Number(x)))
    .range([0, 650])
    .padding(padding)

  const maxDataValue = d3.max(data2, d => d);

  const yScale = d3.scaleLinear()
    .domain([0, maxDataValue])
    .range([0, contHeight-5]) // contHeight it's predefined height

  console.log('yScale:', yScale(50))

  const svg = d3.select(container).select('svg');
  const selectAll = svg.selectAll('rect')
    .data(data2).enter().append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', (d, i) => yScale(d))
    .attr('height', (d) => contHeight - yScale(d))
    .attr('width', rectWidth)
    .attr('stroke-width', 3)
    .attr('stroke', 'plum')
    .attr('fill', 'pink')
};

// drawChart();
// drawScaledChart();
// drawPetals()

