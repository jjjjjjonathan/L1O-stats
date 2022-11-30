import { useD3 } from '../hooks/useD3';
import { useEffect, useState, useRef } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max
} from 'd3';

const GroupedStatsChart = ({ data }) => {

  // const [dataset, setDataset] = useState(data)
  const svgRef = useRef();
  const wrapperRef = useRef();
  const keys = ['a', 'b'];

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0, max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const x0Scale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.46);
    const x1Scale = scaleBand()
      .domain(data.map((d) => d.team))
      .rangeRound([0, x0Scale.bandwidth()])
      .padding(0.12);

    const xAxis = axisBottom(x0Scale);
    const yAxis = axisLeft(yScale);

    svg.select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.select('.y-axis')
      .attr('transform', `translate(${0 + 25}, 0)`)
      .call(yAxis);

    svg.selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => x0Scale(sequence.data.name) + x1Scale(sequence.data.team))
      .attr('width', x1Scale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      // .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
      .attr('height', (sequence) => height - sequence.data.value)
      .attr('fill', (sequence) => sequence.data.colour); // FIX THIS
  }, [data, keys]);

  return (
    <div className='flex flex-row justify-center mx-5'>
      <div
        ref={wrapperRef}
        style={{ width: "100%", height: "400px", marginBottom: "2rem" }}
      >
        <svg
          ref={svgRef}
          style={{ width: "100%", height: "110%" }}
        >
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
  // const ref = useD3((svg) => {
  //   const height = 500;
  //   const width = 500;
  //   const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  //   const statCategories = data.map((d) => d.category);
  //   const homeValues = data.map((d) => ({
  //     statValue: d.values[0].value,
  //     colour: d.values[0].colour
  //   }));
  //   const awayValues = data.map((d) => ({
  //     statValue: d.values[1].value,
  //     colour: d.values[1].colour
  //   }));

  //   console.log(homeValues);
  //   console.log(awayValues);

  //   const x = d3.scaleBand()
  //     .domain(statCategories)
  //     .range([0, width])
  //     .padding(0.2);

  //   const xAxis = (g) =>
  //     g.attr('transform', `translate(0,${height - margin.bottom})`).call(
  //       d3.axisBottom(x)
  //         .tickValues(
  //           d3.ticks(...d3.extent(x.domain()), width / 40)
  //             .filter((v) => x(v) !== undefined)
  //         )
  //         .tickSizeOuter(0)
  //     );

  //   svg.select('.x-axis').call(xAxis);

  //   const y = d3.scaleLinear()
  //     .domain([0, 40])
  //     .range([height, 0]);

  //   const yAxis = (g) =>
  //     g.attr('transform', `translate(${margin.left},0)`)
  //       .style('color', 'steelblue')
  //       .call(d3.axisLeft(y).ticks(null, 's'))
  //       .call((g) => g.select('.domain').remove())
  //       .call((g) =>
  //         g.append('text'))
  //       .attr('x', -margin.left)
  //       .attr('y', 10)
  //       .attr('fill', 'currentcolor')
  //       .attr('text-anchor', 'start')
  //       .text(data.y);

  //   svg.select('.y-axis').call(yAxis);

  //   // svg.select('.plot-area')
  //   //   .selectAll('.bar')
  //   //   .data(data)
  //   //   .join('rect')
  //   //   .attr('class', 'bar')
  //   //   .attr('fill', (d) => d.values[0].colour)
  //   //   .attr('x', (d) => d.category)
  //   //   .attr('width', x.bandwidth())
  //   //   .attr('y', (d) => y(0) - y(d.values[0].value));

  // }, []);
  // return (
  //   <div className='flex flex-row justify-center'>
  //     <svg
  //       ref={ref}
  //       style={{
  //         height: 500,
  //         width: 500,
  //         marginRight: '0px',
  //         marginLeft: '0px'
  //       }}
  //     >
  //       <g className='plot-area' />
  //       <g className='x-axis' />
  //       <g className='y-axis' />
  //     </svg>
  //   </div>

  // );
};

export default GroupedStatsChart;