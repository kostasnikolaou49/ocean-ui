import React, {
  useRef, useEffect, useState,
} from 'react';
import * as d3 from 'd3';

import { getCurrents } from './services/currents.service';
import { Current } from './types/current.type';

const App: React.FC = () => {
  const containerRef = useRef(null);
  const [data, setData] = useState<Current[][]>([]);

  const drawMap = () => {
    if (data.length && containerRef.current) {
      const width = window.innerWidth - 50;
      const height = width / 2;
      const gridColumnsCount = data.length;
      const gridRowsCount = data[0].length;
      const cellWidth = width / gridColumnsCount;
      const cellHeight = width / gridRowsCount;

      const container = d3.select(containerRef.current);
      container.selectAll('*').remove();
      const svgEl = container
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      data.forEach((row, rowIndex) => {
        row.forEach((current, columnIndex) => {
          const { u, v, intensity } = current;

          if (u && v) {
            const x1 = columnIndex * cellWidth + 10;
            const y1 = rowIndex * cellHeight + 10;
            const x2 = x1 + u * 50;
            const y2 = y1 - v * 50;

            svgEl.append('svg:defs').append('svg:marker')
              .attr('id', `triangle-${rowIndex}-${columnIndex}`)
              .attr('refX', 2)
              .attr('refY', 1.5)
              .attr('markerWidth', 10)
              .attr('markerHeight', 10)
              .attr('orient', 'auto')
              .append('path')
              .attr('d', 'M 0 0 4 1.5 0 3 0 2')
              .style('fill', 'green')
              .html('test');

            svgEl.append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2)
              .attr('stroke-width', 1)
              .attr('stroke', 'green')
              .attr('marker-end', `url(#triangle-${rowIndex}-${columnIndex})`);

            const tooltip = d3.select('body')
              .append('div')
              .attr('class', 'tooltip')
              .html(`<span><b>Intensity: </b> ${intensity.toLocaleString()} m/s</span>`);

            svgEl.append('rect')
              .attr('x', x1)
              .attr('y', y1)
              .attr('width', cellWidth)
              .attr('height', cellHeight)
              .attr('fill', 'transparent')
              .on('mouseover', (e: { x: number; y: number; }) => {
                tooltip
                  .style('display', 'inline-block')
                  .style('left', `${e.x}px`)
                  .style('top', `${e.y}px`);
              })
              .on('mouseleave', () => {
                tooltip
                  .style('display', 'none');
              });
          }
        });
      });
    }
  };

  useEffect(() => {
    drawMap();
  }, [data]);

  useEffect(() => {
    getCurrents().then((res: { data: Current[][] }) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Oceanic currents</h1>
      <div ref={containerRef} />
    </div>
  );
};

export default App;
