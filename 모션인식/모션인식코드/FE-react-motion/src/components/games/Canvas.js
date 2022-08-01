import React, { useState } from 'react';

function Canvas(props) {

    const getWebcam = (callback) => {
        try {
          const constraints = {
            'video': true,
            'audio': false
          }
          navigator.mediaDevices.getUserMedia(constraints)
            .then(callback);
        } catch (err) {
          console.log(err);
          return undefined;
        }
      }
      
      const Styles = {
        Video: { width: "100%", height: "100%", background: 'rgba(245, 240, 215, 0.5)' },
        None: { display: 'none' },
      }
    
    const drawToCanvas = () => {
    
      try {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        if (ctx && ctx !== null) {
          if (videoRef.current) {
            ctx.translate(canvasRef.current.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
          }
          ctx.fillStyle = "white";
          ctx.fillRect(10, 10, 100, 40);
          ctx.font = "15px Arial";
          ctx.fillStyle = "green";
          ctx.fillText("user", 15, 30);
        }
      } catch (err) {
        console.log(err);
      }
    }


    const [playing, setPlaying] = React.useState(undefined);
    const [timer, setTimer] = useState(undefined)


    const canvasRef = React.useRef(null);
    const videoRef = React.useRef(null);
   
  
    React.useEffect(() => {
      getWebcam((stream => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      }));
      
    }, []);
  
    const startOrStop = () => {
        if (!timer) {
          const t = setInterval(() => drawToCanvas(), 100);
          setTimer(t);
        } else {
          clearInterval(timer);
          setTimer(undefined);
        }
      }
  
    return (<>
      <div style={{ width: '100%', height: '100%' }}>
      <button color="warning" onClick={() => startOrStop()}>{playing? 'Stop' : 'Start'} </button>
        <video ref={videoRef} autoPlay style={{display:'none'}} />
        <canvas ref={canvasRef} style={Styles.Canvas} />
        
      </div >
    </>);
  }
  
  export default Canvas;