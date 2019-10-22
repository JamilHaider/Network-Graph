import React, {useEffect, useState} from 'react'
import * as d3 from "d3";

function PanZoomSVG(props){

  useEffect(() => {
    d3.select(".graph-container").call(d3.zoom().on("zoom", function(){
      d3.select(".graph").attr("transform", d3.event.transform)
    }))
  })

  return (
    <div className="graph-container">
      <svg className={"graph"} style={{background: "green",height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
        { props.children }
      </svg>
    </div>
  )
}

export function DraggableSVG(props){

  var nodeRef = React.createRef()

  var d = props.data

  const updatePosition = (d, event, nodeView) => {
    d.x += event.dx 
    d.y += event.dy
    nodeView.attr("transform", `translate(${d.x},${d.y})`)
  }

  useEffect(() => {
    d3.select(nodeRef.current).call(
      d3.drag()
        .on("start", function(){
        })
        .on("drag", function(){
          updatePosition(d, d3.event, d3.select(this))
        })
        .on("end", function(){
          
        })
    )
  })


  return (
    <g ref={nodeRef} className={"draggable"} transform={`translate(${d.x},${d.y})`}>
      {props.children}
    </g>    
  )

}
export default PanZoomSVG;
