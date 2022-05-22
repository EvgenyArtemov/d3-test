import '../src/SCSS/base.scss';
import * as d3 from "d3";
import { drawPetals } from './petals'
import { drawScaledChart } from './scaled';


// Simple Hand Made Bar Chart 
let data = [45, 67, 96, 84, 41];
let updateContainerWidth = () => rectWidth * data.length;
const rectWidth = 50;

const htmlSvg = `
    <svg id='svgCont' style="overflow: visible" height=100 style='border: 1px dashed' >
    </svg>
  `;
const container = document.querySelector('div.chart_container');
container.innerHTML = htmlSvg;

const svg = d3.select(container).select('#svgCont');

const randomBtn = document.getElementById('randomChart');
randomBtn.addEventListener('click', () => {
  updateChart(svg);
})

const randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;;

const updateChart = (svg) => {
  data = Array.from({ length: randomRange(3, 10) }, () => randomRange(5, 100));
  updateContainerWidth()
  drawChart(svg, data);
}

function drawChart(svg, data) {
  const trans = d3.transition().duration(600);

  svg.selectAll('rect')
    .data(data)
    .join(
      enter => {
        // attributes to transition FROM
        return enter.append('rect')
          .attr('x', (_, i) => i * rectWidth)
          .attr('height', 0)
          .attr('y', 100)
          .attr('stroke-width', 3)
          .attr('stroke', 'white')
          .attr('fill', 'darkCyan')
      },
      update => update,
      exit => {
        return exit.transition(trans) // attributes to transition TO
          .attr('height', 0)
          .attr('y', 100)
      }
    // next line is ENTER + UPDATE Selection
    )
    .attr('width', rectWidth)
    .transition(trans)
    .attr('x', (_, i) => i * rectWidth)
    .attr('y', (d) => 100 - d)
    .attr('height', d => d)
};

drawChart(svg, data);
drawPetals()
drawScaledChart();
