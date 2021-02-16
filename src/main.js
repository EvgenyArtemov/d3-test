import '../src/SCSS/base.scss';
import * as d3 from "d3";

const data = [45, 67, 96, 84, 41];
const rectWidth = 50;

function drawPetal() {
  // const smileyPath = 'M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0'
  const htmlSvg = `
  <svg id='container' width=${rectWidth * data.length} height=100 style='border: 1px dashed' >
    <rect />
    <rect />
    <rect />
    <rect />
    <rect />
  </svg>
  `;
  const container = document.querySelector('div.petals_container');
  container.innerHTML = htmlSvg;

  const svg = d3.select(container);
  const selectAll = svg.selectAll('rect')
    .data(data)
    .attr('x', (d, i) => i * rectWidth)
    .attr('y', (d, i) => 100 - d)
    .attr('height', (d) => d)
    .attr('width', rectWidth)
    .attr('stroke-width', 3)
    .attr('stroke', 'plum')
    .attr('fill', 'pink')
};

drawPetal();
