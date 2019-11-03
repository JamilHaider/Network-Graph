import React, {useEffect, useState} from 'react'

import PanZoom, {Draggable} from './PanZoom.js'


function Graph(props){
	return (
		<PanZoom>
			{
			 props.nodes.map(node => {
			   return (<Draggable data={node}><h1>{node.id}</h1></Draggable>)
       })
			}
		</PanZoom>
	)
}

export default Graph