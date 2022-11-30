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
  const svgRef = useRef();
  const wrapperRef = useRef();
  const keys = ['a', 'b'];

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);

    const yScale = scaleLinear()
      .domain([0, max(data, (stat) => stat.value)])
      .rangeRound([height, 0]);

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

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.select('.y-axis').attr('transform', `translate(25, 0)`).call(yAxis);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr(
        'x',
        (sequence) => x0Scale(sequence.data.name) + x1Scale(sequence.data.team)
      )
      .attr('width', x1Scale.bandwidth())
      .attr('y', (sequence) => yScale(sequence.data.value))
      .attr('height', (sequence) => height - yScale(sequence.data.value))
      .attr('fill', (sequence) => sequence.data.colour);
  }, [data, keys]);

  return (
    <div className='flex flex-row justify-center'>
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: '400px', marginBottom: '2rem' }}
      >
        <svg ref={svgRef} style={{ width: '100%', height: '110%' }}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
      </div>
    </div>
  );
};

export default GroupedStatsChart;
