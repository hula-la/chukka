import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SingleMode = () => {
  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log('>>>> error ');
      console.log(err);
      return undefined;
    }
  };

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      if (ctx && ctx !== null) {
        if (videoRef.current) {
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          sendImage();
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(10, 10, 100, 40);
        ctx.font = '15px Arial';
        ctx.fillStyle = 'green';
        ctx.fillText('user', 15, 30);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Styles = {
    Videobox: { display: 'flex', margin: '10px 30px' },
    Video: { backgroundColor: 'gray', width: '50%', height: '90vh' },
    stream: { height: '100%', width: '100%' },
    Canvas: {
      width: '100%',
      height: '100%',
      background: 'rgba(245, 240, 215, 0.5)',
    },
    None: { display: 'none' },
  };

  const stream = () => {
    document.getElementById('dancer_video').play();
    setInterval(sendImage, 100);
  };

  const startOrStop = () => {
    if (!timer) {
      stream();
      const t = setInterval(() => drawToCanvas(), 100);
      const video_stream = videoRef.current.srcObject;
      videoRef.current.srcObject = video_stream;
      setTimer(t);
    } else {
      document.getElementById('dancer_video').pause();

      clearInterval(timer);
      setTimer(undefined);
    }
    setPlaying(!playing);
  };

  const sendImage = async () => {
    var rawData = document.getElementById('canvas').toDataURL('image/jpeg');
    websckt.send(rawData);
  };

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
      setError(error);
    }
    setLoading(false);
  };

  const [websckt, setWebsckt] = useState();
  const [playing, setPlaying] = useState(undefined);
  const [timer, setTimer] = useState(undefined);
  const [songID, setSongID] = useState(null);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setSongID(1234);

    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    });
  }, []);

  // useEffect(() => {
  //   sendInfo();
  // }, [songID]);

  useEffect(() => {
    const url = 'ws://localhost:8000/client';
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      console.log('ws.open');

      // recieve message every start page
      ws.onmessage = (e) => {
        console.log('>>>>>>>>>>>>>>>>');
        console.log(e.data);
      };

      setWebsckt(ws);

      //clean up function when we close page
      return () => ws.close();
    };
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div>
      <h2>Sigle Mode</h2>
      <button color="warning" onClick={() => startOrStop()}>
        {playing ? 'Stop' : 'Start'}{' '}
      </button>
      <div style={Styles.Videobox}>
        <div style={Styles.Video}>
          <video
            id="dancer_video"
            height="180"
            preload="auto"
            style={Styles.stream}
            muted="muted"
          >
            <source src="http://localhost:8000/game/dancer" type="video/mp4" />
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
