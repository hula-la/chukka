import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';



const SingleMode = () => {

  const [websckt, setWebsckt] = useState();  
  const [FPS, setFPS] = useState(5);  
  const [Iv, setIv] = useState(null);  
  const [playing, setPlaying] = useState(undefined);
  const [timer, setTimer] = useState(undefined)
  const [songID, setSongID] = useState(null);

  // 게임 이펙트를 위한 변수
  const [gameEF, setGameEF] = useState("img/game_effect/Good.png");

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 동영상 재생을 위한 변수
  const [playVideo, setPlayVideo] = useState(null);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        'video': true,
        'audio': false
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(callback);
    } catch (err) {
      console.log(">>>> error ")
      console.log(err);
      return undefined;
    }
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
          // sendImage();
        }
        
        const GEImage = new Image();
        console.log(gameEF);
        if (gameEF && gameEF !== null) {
          GEImage.src = gameEF;
  
          ctx.drawImage(GEImage, 0,0);
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


  const Styles = {
    Videobox : { display: 'flex', margin: '10px 30px' },
    Video: { backgroundColor: 'gray', width: '50%', height: '90vh' },
    stream : {  height:'100%',  width:'100%'},
    Canvas: { width: "100%", height: "100%", background: 'rgba(245, 240, 215, 0.5)' },
    None: { display: 'none' },
  }

  const stream = () =>{
    document.getElementById("dancer_video").play();
    setIv(setInterval(sendImage, 1000/FPS));
  }


  const startOrStop = () => {
    if (!timer) {
      stream();
      const t = setInterval(() => drawToCanvas(), 100);
      const video_stream = videoRef.current.srcObject;
      videoRef.current.srcObject = video_stream; 
      setTimer(t);
    } else {
      document.getElementById("dancer_video").pause();

      clearInterval(timer);
      setTimer(undefined);
    }
    setPlaying(!playing);
  }

  const sendImage = async () => {
    var rawData = document.getElementById('canvas').toDataURL("image/jpeg");
    websckt.send(rawData);
  }

  const sendInfo = async () => {
    try {
      setError(null);
      setLoading(true);

      // axios.get(`http://localhost:8000/single/${songID}`, {
      //   Headers: {
      //     "Content-Type": `application/text`
      //   },
      // }).then((response) => {
      //   console.log(response.data);
      // });


    } catch (error) {
      setError(error)
    }
    setLoading(false);
  }






  useEffect(() => {

    setSongID(1234);

    getWebcam((stream => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    }));

  }, []);

  // useEffect(() => {
  //   sendInfo();
  // }, [songID]);

  useEffect(() => {
    const url = "ws://localhost:8000/client"
    const ws = new WebSocket(url);
    // var FPS = 5;
    setFPS(2);
    setGameEF("img/game_effect/perfect.png");

    ws.onopen = (event) => {
      console.log("ws.open");

    // recieve message every start page
    ws.onmessage = (e) => {
      console.log(">>>>>>>>>>>>>>>>");
      console.log(e.data+" "+typeof(e.data));
      let similarity = e.data;


      // document.getElementById("dancer_video").play();
      setPlayVideo(true);
      
      // const ctx = document.getElementById('canvas').getContext('2d');
      // const img = new Image();
      if (similarity < 0.15) {
        setGameEF("img/game_effect/perfect.png");
        console.log("perfect:"+gameEF)
        // img.src = 'img/game_effect/perfect.png';
      } else if (similarity < 0.22) {
        setGameEF("img/game_effect/Good.png");
        console.log("Good:"+gameEF)
        // img.src = 'img/game_effect/Good.png';
      }else {
        setGameEF("img/game_effect/bad.png");
        console.log("bad:"+gameEF)
        // img.src = 'img/game_effect/bad.png';
      }
      // img.onload = function() {
      //   ctx.drawImage(img, 30, 0);
      //   // ctx.beginPath();
      //   // ctx.moveTo(30, 96);
      //   // ctx.lineTo(70, 66);
      //   // ctx.lineTo(103, 76);
      //   // ctx.lineTo(170, 15);
      //   // ctx.stroke();
      // };
    };
      
    ws.onclose = function(event) {
      clearInterval(Iv);
      if (event.wasClean) {
        alert(`[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`);
      } else {
        // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
          // event.code가 1006이 됩니다.
        alert('[close] 커넥션이 죽었습니다.');
      }
    };

    setWebsckt(ws);

    //clean up function when we close page
    return () => ws.close();
  }},[]);


  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;



  return (
    <div>
      <h2>
        Sigle Mode
      </h2>
      <button color="warning" onClick={() => startOrStop()}>{playing ? 'Stop' : 'Start'} </button>
      <div style={Styles.Videobox}>
        <div style={Styles.Video}>
        <video id="dancer_video"  height="180" preload='auto' style={Styles.stream} muted="muted">
          <source src="http://localhost:8000/game/dancer" type="video/mp4"/>
        </video>
        </div>
        <div id="canvasDiv" style={Styles.Video}>
          <video ref={videoRef} autoPlay style={Styles.None} />
          <canvas id="canvas" ref={canvasRef} style={Styles.Canvas} />
        </div>

      </div>
    </div>
  );
};

export default SingleMode;
