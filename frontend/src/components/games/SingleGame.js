import { AccountBoxTwoTone } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './singleGame.css';
import pop from '../../img/pop.jpeg';
import styled from 'styled-components';

import './button.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetail } from '../../features/game/gameActions';

const SingleMode = (state) => {
  const navigate = useNavigate();
  const location = useLocation();
  const songID = location.state.songId;

  // const navigate = useNavigate();

  // songID = '3';
  // let isMsgReceived = false;

  const [websckt, setWebsckt] = useState();
  const [FPS, setFPS] = useState(1);
  const [playing, setPlaying] = useState(undefined);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [isMyVideo, setIsMyVideo] = useState(true);

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

  // 점수
  const [goodCnt, setGoodCnt] = useState(0);
  const [perfectCnt, setPerfectCnt] = useState(0);
  const [badCnt, setBadCnt] = useState(0);
  const [score, setScore] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 미리보기
  const previewRef = useRef(null);
  // const previewRef = useRef(null);
  const perfectRef = useRef(0);

  // 관절 영상 분리를 위한 변수
  const [isMsgReceived, setIsMsgReceived] = useState(false);
  const dispatch = useDispatch();
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

      document.getElementById('dancer_video').play();
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
    // setPlaying(!playing);
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
      // setPlaying(true);
      videoRef.current.srcObject = stream;
    });
  }, []);

  useEffect(() => {
    const url = 'wss://i7e202.p.ssafy.io/fastAPI/ws/client';
    const ws = new WebSocket(url);
    setWebsckt(ws);
    setFPS(1);

    ws.onopen = (event) => {
      console.log('ws.open');
      // 노래제목 보내기
      ws.send(songID);
    };

    //clean up function when we close page
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (websckt) {
      websckt.onclose = function (event) {
        console.log('클로징 perfectCnt: ' + perfectCnt);
        clearInterval(timer);
        clearInterval(IV);

        if (event.wasClean) {
          alert(
            `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`,
          );
        } else {
          alert('[close] 커넥션이 죽었습니다.');
        }
        const sendResult = [
          {
            name: 'PERFECT',
            count: perfectCnt,
          },
          {
            name: 'GOOD',
            count: goodCnt,
          },
          {
            name: 'BAD',
            count: badCnt,
          },
        ];
        navigate('/game/result', {
          state: { data: sendResult, songID: songID },
        });
      };

      websckt.onmessage = (e) => {
        setPlaying(true);
        if (typeof e.data === 'string') {
          setIsMsgReceived(true);
          let similarity = e.data;
          console.log(similarity);
          // [] 제거
          similarity = similarity.replace(/[\[\]]+/g, '');

          if (similarity == 0) {
            setGameEF('../../img/game_effect/notFound.png');
          } else if (similarity < 0.02) {
            setPerfectCnt((perfectCnt) => perfectCnt + 1);
            setScore((score) => score + 1000);
            setGameEF('../../img/game_effect/perfect.png');
          } else if (similarity < 0.03) {
            setGoodCnt((prev) => prev + 1);
            setScore((score) => score + 500);
            setGameEF('../../img/game_effect/good.png');
          } else {
            setBadCnt((prev) => prev + 1);
            setGameEF('../../img/game_effect/bad.png');
          }
        }
        // 전달받은 데이터가 이미지일 때
        else {
          try {
            var arrayBufferView = new Uint8Array(e.data);
            const myFile = new File([e.data], 'imageName');
            const reader = new FileReader();

            reader.onload = (ev) => {
              const previewImage = String(ev.target.result);
              if (isMsgReceived) {
                setIsMsgReceived(false);
                setUserPoseImg(previewImage);
                // setIsMsgReceived(isMsgReceived=>false) // myImage라는 state에 저장했음
              } else {
                setPreviewImage(previewImage); // myImage라는 state에 저장했음
              }
            };
            reader.readAsDataURL(myFile);

            // clearTime();
          } catch (err) {
            console.log(err);
          }
        }
      };
    }
  }, [websckt, perfectCnt, goodCnt, badCnt, isMsgReceived, score]);

  const { musicDetail } = useSelector((state) => state.game);
  useEffect(() => {
    dispatch(fetchDetail(songID));
  }, [dispatch]);

  const Styles = {
    GamePage: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overlay: 'hidden',
    },
    gameCountDown: {
      position: 'relative',
      width: '30vw',
      height: '30vw',
      left: 'calc(50% - 15vw)',
      top: 'calc(20vh)',
    },

    pageTitle: { padding: '30px' },
    Score: { fontSize: '40px', paddingTop: '20vh', paddingLeft: '40px' },

    gameContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      height: '100vh',
    },
    gameColSide: { width: '25%', position: 'relative' },
    gameColCenter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '50%',
      position: 'relative',
      alignItems: 'center',
    },
    MyVideo: {
      width: '80%',
      position: 'absolute',
      right: '2vw',
      bottom: '10vh',
      border: '3px solid #e7d8b4',
      margin: '10px',
    },

    ButtonContainer: {
      display: 'flex',
      position: 'absolute',
      right: '3vw',
      bottom: '3vh',
    },
    scoreEFContainer: { width: '100%', height: '20vh', textAlign: 'center' },
    dancerContainer: { height: '70vh', border: '3px solid rgb(60 126 187)' },
    // SkeletonContainer: {height:'70vh'},

    stream: { height: '100%', width: '100%' },

    Canvas: {
      width: '100%',
      height: '100%',
      // background: 'rgba(245, 240, 215, 0.5)',
    },
    None: { display: 'none' },
    PoseContainer: {
      display: 'flex',
      position: 'absolute',
      width: '80%',
      top: '20vh',
      right: '2vw',
    },
    DancerPoseObject: {
      width: '40%',
      margin: '3px',
      border: '3px solid rgb(60 126 187)',
    },
    UserPoseObject: {
      width: '40%',
      margin: '3px',
      border: '3px solid #e7d8b4',
    },

    // 노래 정보
    Album: {
      position: 'absolute',
      left: '0',
      bottom: '10vh',
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      padding: '2vw',
    },
    AlbumImg: { width: '50%' },
    AlbumInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginLeft: '2vw',
    },
    AlbumTitle: { fontSize: '25px' },
  };

  return (
    <div style={Styles.GamePage}>
      {/* 게임 시작 전 카운터 */}
      {gameStartCounter != 0 && (
        <img
          src="../../img/game_effect/countdown.gif"
          alt="loading..."
          style={Styles.gameCountDown}
        />
        // <div id="gameStartCounter" style={Styles.gameCountDown}>
        // </div>
      )}

      {/* 게임 카운터 후 시작 */}
      {gameStartCounter == 0 && (
        <div style={Styles.gameContainer}>
          {/* 왼쪽 */}
          <div style={Styles.gameColSide}>
            <h2 style={Styles.pageTitle}>Single Mode</h2>
            <div style={Styles.Score}>Score: {score}</div>
            {musicDetail !== null && (
              <div style={Styles.Album}>
                <img
                  src={`https://chukkachukka.s3.ap-northeast-2.amazonaws.com/game/thumnail/${songID}`}
                  style={Styles.AlbumImg}
                ></img>
                <div style={Styles.AlbumInfo}>
                  <div style={Styles.AlbumTitle}>{musicDetail.songName}</div>
                  <div>{musicDetail.singer}</div>
                </div>
              </div>
            )}
          </div>

          {/* 중간 */}

          <div style={Styles.gameColCenter}>
            <div style={Styles.scoreEFContainer}>
              {playing == true && (
                <img id="scoreCanvas" className="scoreEF" src={gameEF} />
              )}
            </div>

            <div style={Styles.dancerContainer}>
              <video
                id="dancer_video"
                height="180"
                preload="auto"
                style={Styles.stream}
                // muted="muted"
              >
                <source
                  src={
                    'https://chukkachukka.s3.ap-northeast-2.amazonaws.com/game/video/' +
                    songID
                  }
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* 오른쪽 */}
          <div style={Styles.gameColSide}>
            {/* <div style={Styles.SkeletonContainer}> */}
            {/* 관절 영상 */}

            {playing == true && isSkeleton && (
              <div style={Styles.PoseContainer}>
                <img
                  id="previewImg"
                  src={previewImage}
                  style={Styles.DancerPoseObject}
                />

                <img
                  id="userPoseImg"
                  src={userPoseImg}
                  style={Styles.UserPoseObject}
                ></img>
              </div>
            )}

            {/* </div> */}

            {/* 내 영상 */}
            {isMyVideo == true && (
              <div id="canvasDiv" style={Styles.MyVideo}>
                <canvas id="canvas" ref={canvasRef} style={Styles.Canvas} />
              </div>
            )}

            <div style={Styles.ButtonContainer}>
              <div>관절 영상</div>
              <div className="wrapper">
                <input
                  type="checkbox"
                  id="switch"
                  className="switch"
                  checked={isSkeleton}
                  onChange={() => {
                    setIsSkeleton(!isSkeleton);
                  }}
                />
                <label htmlFor="switch" className="switch_label">
                  <span className="onf_btn"></span>
                </label>
              </div>

              <div>내 영상</div>
              <div className="wrapper">
                <input
                  type="checkbox"
                  id="switch2"
                  className="switch"
                  checked={isMyVideo}
                  onChange={() => {
                    setIsMyVideo(!isMyVideo);
                  }}
                />
                <label htmlFor="switch2" className="switch_label">
                  <span className="onf_btn"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <video ref={videoRef} autoPlay style={Styles.None} />
    </div>
  );
};

export default SingleMode;
