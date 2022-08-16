import { AccountBoxTwoTone } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleMode = (songID) => {
  const navigate = useNavigate();
  songID = "soojin";
  // let isMsgReceived = false;


  const [websckt, setWebsckt] = useState();
  const [FPS, setFPS] = useState(1);
  const [playing, setPlaying] = useState(undefined);
  const [timer, setTimer] = useState(undefined);
  
  // setInterval
  const [IV, setIV] = useState(undefined);
  // const [timeDecrease, setTimeDecrease] = useState(undefined);  
  // 게임 이펙트를 위한 변수
  const [gameEF, setGameEF] = useState(null);
  // 미리보기
  const [previewImage, setPreviewImage] = useState(null);
  const [userPoseImg, setUserPoseImg] = useState(null);
  // 게임 시작 카운터
  const [gameStartCounter, setGameStartCounter] = useState(3);
  
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  
  
  const [goodCnt, setGoodCnt] = useState(0);
  const [perfectCnt, setPerfectCnt] = useState(0);
  const [badCnt, setBadCnt] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // 미리보기
  const previewRef = useRef(null);
  // const previewRef = useRef(null);
  const perfectRef = useRef(0);
  
  // 관절 영상 분리를 위한 변수
  const [isMsgReceived, setIsMsgReceived] = useState(false)

  // 미리동작 보기를 위한 타이머
  // const [time, setTime] = useState(10);
  // const clearTime = () => {
  //   setTime(10);
  // };

  // 점수 업그레이드
  // const scoreChange = type => {
  //   console.log(type);
  //   setScore({
  //     ...score,
  //     "bad": 1
  //   });
  //   console.log(score);
  // }

  // 동영상 재생을 위한 변수
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

          // 뒤집기
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          // ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const stream = () => {
  //   const a = setInterval(() => sendImage(), 1000 / FPS);
  //   const b = setInterval(() => {
  //     setTime(prevTime => prevTime - 1); // <-- Change this line!
  //   }, 100)
  //   console.log(a, b,timer);
  //   setIV(a);
  //   setTimeDecrease(b);

  //   document.getElementById("dancer_video").play();
  // }

  const startOrStop = () => {
    // console.log("timer: " + timer)
    
    if (!timer) {
      const a = setInterval(() => sendImage(), 1000 / FPS);
      // const b = setInterval(() => {
      //   setTime(prevTime => prevTime - 1);
      // }, 100)
      // stream();****************
      // console.log(a, b,timer);
      setIV(a);
      // IV_tmp = a;
      // setTimeDecrease(b);
      
      document.getElementById("dancer_video").play();
      // **********************************
      
      const t = setInterval(() => drawToCanvas(), 50);
      // const video_stream = videoRef.current.srcObject;
      // videoRef.current.srcObject = video_stream;
      setTimer(t);
      // timer_tmp = t;
    } else {
      document.getElementById('dancer_video').pause();

      // console.log("************");
      // console.log(IV, timer);
      // console.log("************");

      clearInterval(timer);
      setTimer(undefined);

      //
      // clearInterval(timeDecrease);
      clearInterval(IV);
      // setTimeDecrease(undefined);
      setIV(undefined);
    }
    setPlaying(!playing);
  };

  const sendImage = async () => {
    var rawData = document.getElementById('canvas').toDataURL('image/jpeg');
    websckt.send(rawData);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(gameStartCounter) > 0) {
        setGameStartCounter(parseInt(gameStartCounter) - 1);
      }
      if (parseInt(gameStartCounter) === 0) {
        clearInterval(countdown);
        startOrStop();
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [gameStartCounter]);

  useEffect(() => {
    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    });

    const url = 'wss://i7e202.p.ssafy.io/fastAPI/ws/client';
    // const url = 'ws://localhost:8000/fastAPI/ws/client';
    const ws = new WebSocket(url);
    setWebsckt(ws);
    setFPS(1);

    ws.onopen = (event) => {
      console.log('ws.open');
      // 노래제목 보내기
      ws.send(songID);
    }
    
    //clean up function when we close page
    return () => ws.close();
  }, []);
  
  useEffect(() => {
    if (websckt) {

      websckt.onclose = function (event) {
        console.log("클로징 perfectCnt: " + perfectCnt);
        // // console.log(timeDecrease);
        // // console.log(IV);
        // console.log("IV_tmp: " + IV_tmp);
        // console.log("IV: " + IV);
        clearInterval(timer);
        clearInterval(IV);
        // clearInterval(IV_tmp);
        // // setTimeDecrease(undefined);
        // setIV(undefined);
  
        // startOrStop();
  
        if (event.wasClean) {
          alert(`[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`);
        } else {
          alert('[close] 커넥션이 죽었습니다.');
        }
        const sendResult=[
          {
            name:"PERFECT",
            count:123,
          },
          {
            name:"GOOD",
            count:28,
          },
          {
            name:"BAD",
            count:4,
          },
        ]
        navigate("/game/result",{state:{data:sendResult}});

      };

      
      websckt.onmessage = (e) => {
        // console.log(perfectCnt);
    
    
        // console.log("IV_tmp: " + IV_tmp);
        // 전달받은 데이터가 문자열일 때(유사도) 
        if (typeof (e.data) === "string") {
          // setIsMsgReceived(isMsgReceived=>true);
          setIsMsgReceived(true);
          let similarity = e.data;
          console.log(similarity);
          // [] 제거  
          similarity = similarity.replace(/[\[\]]+/g, '');
          
          
          if (similarity == 0) {
            // console.log("카운팅되는중~")
            // setPerfectCnt((perfectRef.current+=1));
            // console.log(perfectCnt);
            setGameEF("../../img/game_effect/norecognize.png");
          } else if (similarity < 0.01) {
            setPerfectCnt(perfectCnt=>perfectCnt+1);
            setGameEF("../../img/game_effect/perfect.png");
          } else if (similarity < 0.02) {
            setGoodCnt(prev => prev + 1);
            setGoodCnt(goodCnt=>goodCnt+1);
            setGameEF("../../img/game_effect/good.png");
          } else {
            setBadCnt(prev => prev + 1);
            setBadCnt(badCnt=>badCnt+1);
            setGameEF("../../img/game_effect/bad.png");
          }

          
        }
        // 전달받은 데이터가 이미지일 때
        else {
          try {
            var arrayBufferView = new Uint8Array(e.data);
            const myFile = new File([e.data], 'imageName')
            const reader = new FileReader()
            
            reader.onload = ev => {
              const previewImage = String(ev.target.result)
              if (isMsgReceived) {
                setIsMsgReceived(false);
                setUserPoseImg(previewImage)
                // setIsMsgReceived(isMsgReceived=>false) // myImage라는 state에 저장했음
              } else {
                setPreviewImage(previewImage) // myImage라는 state에 저장했음
              }
            }
            reader.readAsDataURL(myFile);
    
            // clearTime();
    
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }, [websckt,perfectCnt, goodCnt, badCnt,isMsgReceived]);
  
  useEffect(() => {
    
  })
  

  const Styles = {
    gameBox: { display: 'flex-column' },
    Videobox: { position: 'relative', display: 'flex' },
    Video: { backgroundColor: 'gray', width: '50%', height: '50vh' },
    stream: { height: '100%', width: '100%' },
    Canvas: {
      width: '100%',
      height: '100%',
      background: 'rgba(245, 240, 215, 0.5)',
    },
    ScoreBox: { position: 'relative', zIndex: '3' },
    Score: { position: 'absolute', width: '50%', top: '10px', height: '10vh' },
    Time: {
      position: 'absolute',
      width: '50%',
      top: '10px',
      height: '10vh',
      zIndex: '5',
    },
    None: { display: 'none' },
    previewImage: { position: 'absolute', height: '15vh' },
    PoseContainer: { display: 'flex' },
    Pose: { width: '50%', height: '20vh' },
    PoseObject: { width: '50%', margin: 'auto' },
  };

  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div>
      <h2>Sigle Mode</h2>
      {gameStartCounter != 0 && (
        <div id="gameStartCounter">
        <img src="../../img/game_effect/countdown.gif" alt="loading..." />
        </div>
      )}

      {gameStartCounter == 0 && (
        <div>

          {/* <button color="warning" onClick={() => startOrStop()}>{timer} </button> */}
          <div style={ Styles.gameBox}>
            <div style={Styles.Videobox}>
              <div style={Styles.Video}>
                <video
                  id="dancer_video"
                  height="180"
                  preload="auto"
                  style={Styles.stream}
                  muted="muted"
                >
                  <source
                    src={
                      'https://chukkachukka.s3.ap-northeast-2.amazonaws.com/game/video/' +
                      songID
                    }
                    type="video/mp4"
                  />
                  {/* <source src="http://localhost:8000/fastAPI/game/dancer" type="video/mp4"/> */}
                </video>
              </div>
              <div id="canvasDiv" style={Styles.Video}>
                <div style={Styles.ScoreBox}>
                  <img id="scoreCanvas" src={gameEF} style={Styles.Score} />
                  <canvas id="canvas" ref={canvasRef} style={Styles.Canvas} />
                </div>
              </div>
            </div>
            <div style={Styles.PoseContainer}>
              <div style={Styles.Pose}>
                {/* <div style={Styles.Time}>ms: { time }</div> */}
                <img
                  id="previewImg"
                  src={previewImage}
                  style={Styles.PoseObject}
                />
              </div>
              <div style={Styles.Pose}>
                <img
                  id="userPoseImg"
                  src={userPoseImg}
                  style={Styles.PoseObject}
                ></img>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay style={Styles.None} />
    </div>
  );
};

export default SingleMode;
