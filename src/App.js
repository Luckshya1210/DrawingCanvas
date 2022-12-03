import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
const colors = [
  "red",
  "green",
  "yellow",
  "black",
  'blue'

]
function App() {
  const canvasRef = useRef(null);
  const ctx=useRef(null)
  const [mouseDown,setmousedown]=useState(0);
  const [lastposition,setPosition]=useState({x:0,y:0})
  const [selectedColor,setselectedcolor]=useState(colors[0]);
  const draw=useCallback((x,y)=>{
    if(mouseDown){
      ctx.current.beginPath();
      ctx.current.strokeStyle=selectedColor;
      ctx.current.lineWidth=10;
      ctx.current.lineJoin='round';
      ctx.current.moveTo(lastposition.x,lastposition.y);
      ctx.current.lineTo(x,y);
      ctx.current.closePath();
      ctx.current.stroke(); //outlines the path
      setPosition({x,y});
    }
  },[lastposition],mouseDown,selectedColor,setPosition)
  
  useEffect(()=>{
    if(canvasRef.current){
      ctx.current=canvasRef.current.getContext('2d')  
      // console.log(canvasRef.current.getContext('2d'))
    }
  },[])
  const onMouseDown=(e)=>{
    setPosition(
      {
        x:e.pageX,
        y:e.pageY
      }
    )
    setmousedown(1) 
  }
  const onMouseUp=(e)=>{
    
   
    setmousedown(0)
  }
  const onMouseLeave=(e)=>{
     
    setmousedown(0)
  }
  const onMouseMove=(e)=>{
    //  console.log(e.pageX)
    draw(e.pageX,e.pageY)
  }
  const clear=()=>{
    ctx.current.clearRect(0,0,ctx.current.canvas.width,ctx.current.canvas.height)
  }
  const download=async ()=>{
    const image=canvasRef.current.toDataURL('image/png')
    const blob=await(await fetch(image)).blob();
    const bloburl=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=bloburl;
    link.download='image.png'
    link.click();
  }
  
  // console.log(mouseDown,lastposition)
  return (
    < >
    <h1>CANVAS</h1>
      <canvas width={1500} height={500} ref={canvasRef} style={{ border: "2px solid black" ,borderRadius:'14px',marginTop:'20px' ,marginLeft:'15px',marginRight:'20px'}} 
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
      />
      <br />
      <div className='f' >
        <select value={selectedColor} onChange={(e)=>setselectedcolor(e.target.value)}>
          {
            colors.map(color => {
              return (<option key={color} value={color}>{color}</option>)
            })
          }
        </select>
        <button onClick={clear}>Clear</button>
        <button onClick={download}>Download</button>
        {/* <button></button> */}

      </div>
    </ >
  );
} 


export default App;
