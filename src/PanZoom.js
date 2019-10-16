import React, {useEffect} from 'react'
import * as d3 from "d3";

function PanZoom(props){

  useEffect(() => {
    d3.select(".graph-container").call(d3.zoom().on("zoom", function(){
      d3.select(".graph").attr("transform", d3.event.transform)
    }))

    d3.selectAll(".conceptG").data(props.nodes) 
  })

  return (
    <div className="graph-container">
      <svg className={"graph"} style={{height: "-webkit-fill-available", width: "-webkit-fill-available"}}>
        { props.children }
      </svg>
    </div>
  )
}


export default PanZoom;
