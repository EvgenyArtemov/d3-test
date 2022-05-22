import movies from './movies.json';
import * as d3 from "d3";


// Petals Movie Chart
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
searchBtn.addEventListener('click', () => {
  updateDrawPetals(searchInput.value);
})
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  updateDrawPetals();
})
const movieData = Object.values(movies);
const pathWidth = 120
const perRow = 7
const svgHeight = (Math.ceil(movieData.length / perRow) + 0.5) * pathWidth;
const minMaxRating = d3.extent(movieData, d => d.imdbRating);
const minMaxVotes = d3.extent(movieData, d => d.imdbVotes);

const colors = [
  "#ffc8f0",
  "#cbf2bd",
  "#afe9ff",
  "#ffb09e",
  "#FFF2B4",
]

const topGenres = ["Action", "Comedy", "Animation", "Drama"];

const petalPaths = [
  "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0",
  "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
  "M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0",
  "M0 0 C50 25 50 75 0 100 C-50 75 -50 25 0 0"
]

const calculateGridPos = (i) => [(i % perRow + 0.5) * pathWidth, (Math.floor(i / perRow) + 0.5) * pathWidth];

const colorScale = d3.scaleOrdinal()
  .domain(topGenres)
  .range(colors)
  .unknown(colors[4])

const pathScale = d3.scaleOrdinal()
  .range(petalPaths)

const sizeScale = d3.scaleLinear()
  .domain(minMaxRating)
  .range([0.2, 0.75 ])

const numPetalScale = d3.scaleQuantize()
  .domain(minMaxVotes)
  .range([5, 6, 7, 8, 9, 10, 11])

let flowers = movieData.map((movie, i) => {
  return {
    title: movie.Title,
    translate: calculateGridPos(i),
    color: colorScale(movie.Genre.split(',')[0]),
    path: pathScale(movie.Rated),
    scale: sizeScale(movie.imdbRating),
    numPetals: numPetalScale(movie.imdbVotes)
  }
})

let filtered = flowers;

function updateDrawPetals(filterValue = '') {
  if(filterValue !== '') {
    filtered = flowers.filter(movie => movie.title.toLowerCase().includes(filterValue))
      .map((movie, i) => ({...movie, translate: calculateGridPos(i)}))
  } else {
    filtered = flowers;
  }
  drawPetals()
}

export function drawPetals() {

  const htmlSvg = `<svg id="svgCont" width=${perRow * pathWidth} height=${svgHeight} style='border: 1px dashed'></svg>`;

  const container = document.querySelector('div.petals_container');
  container.innerHTML = htmlSvg;

  const svg = d3.select(container).select('#svgCont');
  const group = svg.selectAll('g')
    .data(filtered).enter().append('g')

  const path = group.selectAll('path')
    .data(d => Array.from({length: d.numPetals}, (_, i) => (
      {
        ...d,
        rotate: i * (360 / d.numPetals)})
    )).enter().append('path')

  const text = group.append('text').text(d => d.title)
  

  group.attr('transform', (d, i) => `translate(${d.translate})`)

  text.attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .style('font-size', '.7em')
  .style('font-style', 'italic')
  .text(d => d.title.length > 20 ? d.title.slice(0, 20).concat('...') : d.title)

  path.attr('transform', d => `rotate(${d.rotate}) scale(${d.scale})`)
    .attr('fill', d => d.color)
    .attr('d', d => d.path)
    .attr('fill-opacity', 0.5)
    .attr('stroke', d => d.color)

  // svg.selectAll('path')
  //   .data(flowers).enter().append('path')
  //   .attr('d', (d) => d.path)
  //   .attr('transform', (d,i) => `translate(${d.translate}) scale(${d.scale})`)
  //   .attr('fill', (d) => d.color)
  //   .attr('fill-opacity', 0.5)
  //   .attr('stroke', (d) => d.color)

}