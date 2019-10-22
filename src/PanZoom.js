import React, {useEffect, useState} from 'react'
import * as d3 from "d3";

function PanZoom(props){

  var [scale,setScale] = useState(1)

  // modifying children to add scale value to the props.
  var children = React.Children.map(props.children, child => {
      return React.cloneElement(child, { "scale": scale })  
  })

  useEffect(() => {
    d3.select(".graph-container").call(d3.zoom().on("zoom", function(){
      var d = d3.event.transform
      setScale(d.k)
      d3.select(".graph").style("transform", `translate(${d.x}px,${d.y}px) scale(${d.k})`)
    }))
  })
  return (
    <div className="graph-container" style={{overflow: "auto"}}>
      <div className={"graph"} style={{background: "green",height: "500px", width: "500px"}}>
        {
          children          
        }
      </div>
    </div>
  )
}


export function Draggable(props){

  var nodeRef = React.createRef()

  var [position, setPosition] = useState(props.data)

  const updatePosition = (position, event, nodeView) => {
    position.x = position.x + (event.dx)/props.scale 
    position.y = position.y + (event.dy)/props.scale
    setPosition(position)
    nodeView.style("transform", `translate(${position.x}px,${position.y}px)`)
  }

  useEffect(() => {
    d3.select(nodeRef.current).call(
      d3.drag()
        .on("start", function(){
        })
        .on("drag", function(){
          updatePosition(position, d3.event, d3.select(this))
        })
        .on("end", function(){
        })
    )
  })


  return (
    <div ref={nodeRef} className={"draggable"} style={{position: "absolute", transform:`translate(${position.x}px,${position.y}px)`}}>
      {props.children}
    </div>    
  )

}

export default PanZoom;
