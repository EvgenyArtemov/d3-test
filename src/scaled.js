import * as d3 from "d3";


// Scaled Chart
const data2 = [98, 34, 23, 58, 75, 10, 45, 91];
const rectWidth = 50;


export function drawScaledChart() {
  const height = 200;
  const htmlSvg = `
  <svg id='container' width=${rectWidth * data2.length} height=${height} style='border: 1px dashed' >
  </svg>
  `;
  const container = document.querySelector('div.scaledChart_container');
  container.innerHTML = htmlSvg;

  const xScale = d3.scaleBand()
    .domain(Object.keys(data2))
    .range([0, rectWidth * data2.length])
    .padding(0.35)


  const maxDataValue = d3.max(data2, d => d);

  const yScale = d3.scaleLinear()
    .domain([0, maxDataValue])
    .range([height, 0])

  const svg = d3.select(container).select('svg');
  svg.selectAll('rect')
    .data(data2).enter().append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', (d, i) => yScale(d))
    .attr('height', (d) => height - yScale(d))
    .attr('width', rectWidth)
    .attr('transform', (d, i) => `translate(${i*rectWidth})`)
    .attr('stroke-width', 3)
    .attr('stroke', 'plum')
    .attr('fill', 'pink')
};