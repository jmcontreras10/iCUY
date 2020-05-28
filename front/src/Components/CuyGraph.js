import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import img from '../assets/cuy.svg'
import imgF from '../assets/goal.svg'

const GraphNumber = (props) => {

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [currentState, setCurrentState] = useState(0)

    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
            setCurrentState(props.value.toFixed(2));
        }
    }, []);

    const svg = d3.select('.progressCuy')
        .append('svg')
        .attr('height', dimensions.height)
        .attr('width', dimensions.width);

    svg.append('rect')
        .attr('class', 'bg-rect')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', 'gray')
        .attr('height', 15)
        .attr('width', dimensions.width - 50)
        .attr('x', 0);

    const progress = svg.append('rect')
        .attr('class', 'progress-rect')
        .attr('fill', '#0e4b6e')
        .attr('height', 15)
        .attr('width', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('x', 0);

    const cuy = svg.append('image')
        .attr("xlink:href", img)
        .attr('width', 30)

    progress.transition()
        .duration(1000)
        .attr('width', currentState * dimensions.width - 50);

    cuy.transition()
        .duration(1000)
        .attr('x', currentState * dimensions.width - 75);

    const goal = svg.append('image')
        .attr("xlink:href", imgF)
        .attr('width', 30)
        .attr('x', dimensions.width - 60)
        .attr('y', -10)




    return (
        <div class="progressCuy" ref={targetRef}>Mi Progress Cuy</div>
    )

}

export default GraphNumber

