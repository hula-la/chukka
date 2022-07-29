import React , {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import  gameApi from '../../lib/api/game';
import Canvas from './Canvas'

const SingleMode = () => {

    const[clientId, setClientId] = useState(
        Math.floor(new Date().getTime()/1000)
    );

    const [chatHistory, setChatHostory] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [websckt, setWebsckt] = useState();

    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

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
        Video :{backgroundColor : 'gray', width:'50%', height: '500px'},
        Canvas: { width: "100%", height: "100%", background: 'rgba(245, 240, 215, 0.5)' },
        None: { display: 'none' },
      }
    
    const drawToCanvas = () => {
    
      try {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // var rawData = canvasRef.toDataURL("image/jpeg", 0.5);
        // websckt.send(rawData);
        

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

    const startOrStop = () => {
        if (!timer) {
          const t = setInterval(() => drawToCanvas(), 100);
          setTimer(t);
        } else {
          clearInterval(timer);
          setTimer(undefined);
        }
        setPlaying(!playing);
    }

    const sendInfo = async ()  =>{
        try {
            setError(null);
            setLoading(true);

            gameApi.get(`/single/${songID}`, {
                Headers : { 
                    "Content-Type" : `application/text`
                },
            }).then((response)=>{
                console.log(response.data);
            });
            

        } catch (error) {
            setError(error)
        }
        setLoading(false);
    }

    const [user, setUser] = useState(null);
    const [songID, setSongID] = useState(null);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const [playing, setPlaying] = React.useState(undefined);
    const [timer, setTimer] = useState(undefined)

    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const dancerCanvasRef = React.useRef(null);

    useEffect(() =>{

        setUser('dusdml');
        setSongID(1234);

        getWebcam((stream => {
            setPlaying(true);
            videoRef.current.srcObject = stream;
          }));
        
    }, [])

    useEffect(() => {
        const url = "ws://localhost:8000/ws/" + clientId;
        const ws = new WebSocket(url);
    
        ws.onopen = (event) => {
          ws.send("Connect");
        };
    
        // recieve message every start page
        ws.onmessage = (e) => {
          const message = JSON.parse(e.data);
          setMessages([...messages, message]);
        };
    
        setWebsckt(ws);

        //clean up function when we close page
        return () => ws.close();
      }, [message,messages]);


    const sendMessage = () => {



        // recieve message every send message
        websckt.onmessage = (e) => {
            console.log(e.data);
        //   const message = JSON.parse(e.data);
        //   setMessages([...messages, message]);
        };
        setMessage([]);
      };
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;


    
    return (
        <div>
            <h2>
                Sigle Mode
            </h2>
            <button color="warning" onClick={() => startOrStop()}>{playing ? 'Stop' : 'Start'} </button>
            <div style={{display : 'flex', margin : '10px 30px'}}>
                <div style={Styles.Video}>
                <canvas ref={dancerCanvasRef} style={Styles.Canvas} />
                </div>
                <div style={Styles.Video}>
                    
                    <video ref={videoRef} autoPlay style={Styles.None} />
                    <canvas ref={canvasRef} style={Styles.Canvas} />
                </div>
                
            </div>
        </div>
    );
};

export default SingleMode;
