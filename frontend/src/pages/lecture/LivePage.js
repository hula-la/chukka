import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import UserVideoComponent from '../../components/UserVideoComponent';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import OpenViduLayout from './openvidu-layout';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */

  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */

  /* & .stream-div {
    width: 50%;
    display: flex;
  } */

  & .video-div {
    display: flex;
    flex-grow: 1;
    width: 100%;
    /* height: 89%; */
  }
  & .video-btn-div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  & .lecture-header {
    display: flex;
    justify-content: space-between;
  }
  & .student-div {
    background: white;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    width: 50%;
  }
`;

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const LivePage = () => {
  const [OV, setOV] = useState(undefined);
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100),
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  var layout = new OpenViduLayout();

  const onbeforeunload = (event) => {
    leaveSession();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    // joinSession();

    return () => {
      window.addEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const handleChangeMySessionId = (e) => {
    setMySessionId(e.target.value);
  };
  const handleChangeMyUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const updateLayout = () => {};

  const deleteSubscriber = (streamManager) => {
    let newSubscribers = subscribers;
    let index = newSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers([...newSubscribers]);
    }
  };

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      const newSubscribers = subscribers;
      newSubscribers.push(subscriber);
      setSubscribers([...newSubscribers]);
    });

    newSession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on('exception', (exception) => {
      console.warn(exception);
    });

    getToken().then((token) => {
      newSession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          const devices = await newOV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          let publisher = newOV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          newSession.publish(publisher);

          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setSession(newSession);
          setOV(newOV);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const getToken = async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <Wrapper>
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                joinSession();
              }}
            >
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="myUserName"
                  value={myUserName}
                  onChange={handleChangeMyUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="mySessionId"
                  value={mySessionId}
                  onChange={handleChangeMySessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}
      {session !== undefined && mySessionId == myUserName ? (
        <>
          <div className="lecture-header">
            <h1>강사페이지 입니다. {mySessionId}</h1>
            <div>
              <button
                onClick={() => {
                  publisher.publishVideo(!videoEnabled);
                  setVideoEnabled(!videoEnabled);
                }}
              >
                비디오 끄기
              </button>
              <input
                type="button"
                onClick={leaveSession}
                value="Leave session"
              />
            </div>
          </div>
          <div className="video-div">
            <UserVideoComponent streamManager={publisher} setWidth={true} />
            <div class="student-div">
              <div className="layout">
                <div
                  className="OT_root OT_publisher custom-class"
                  id="remoteUsers"
                >
                  <UserVideoComponent streamManager={publisher} />
                  <UserVideoComponent streamManager={publisher} />
                  <UserVideoComponent streamManager={publisher} />
                  <UserVideoComponent streamManager={publisher} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {session !== undefined && mySessionId != myUserName ? (
        <>
          <div className="lecture-header">
            <h1>{mySessionId}</h1>
            <div>
              <button
                onClick={() => {
                  publisher.publishVideo(!videoEnabled);
                  setVideoEnabled(!videoEnabled);
                }}
              >
                비디오 끄기
              </button>
              <input
                type="button"
                onClick={leaveSession}
                value="Leave session"
              />
            </div>
          </div>
          <div className="video-div">
            <UserVideoComponent streamManager={publisher} setWidth={true} />
            <UserVideoComponent streamManager={publisher} setWidth={true} />
          </div>
        </>
      ) : null}
    </Wrapper>
  );
  // return (
  //   <Wrapper>
  //     <div>
  //       {session !== undefined ? (
  //         <div>
  //           <div>
  //             <h1 id="session-title">{mySessionId}</h1>
  //             <input
  //               type="button"
  //               onClick={leaveSession}
  //               value="Leave session"
  //             />
  //           </div>
  //           <div>
  //             {mainStreamManager !== undefined ? (
  //               <div className="col-md-6">
  //                 <UserVideoComponent streamManager={mainStreamManager} />
  //                 {/* <input
  //               className="btn btn-large btn-success"
  //               type="button"
  //               id="buttonSwitchCamera"
  //               // onClick={switchCamera}
  //               value="Switch Camera"
  //             /> */}
  //               </div>
  //             ) : null}
  //             <div>
  //               {publisher !== undefined ? (
  //                 <div
  //                   className="stream-container col-md-6 col-xs-6"
  //                   onClick={() => handleMainVideoStream(publisher)}
  //                 >
  //                   <UserVideoComponent streamManager={publisher} />
  //                   <button
  //                     onClick={() => {
  //                       setVideoState(!videoState);
  //                       publisher.publishVideo(videoState);
  //                     }}
  //                   >
  //                     aaaaa
  //                   </button>
  //                 </div>
  //               ) : null}
  //               {subscribers.map((sub, i) => {
  //                 const { clientData } = JSON.parse(sub.stream.connection.data);
  //                 if (clientData !== myUserName) {
  //                   return (
  //                     <div
  //                       key={i}
  //                       className="stream-container col-md-6 col-xs-6"
  //                       onClick={() => handleMainVideoStream(sub)}
  //                     >
  //                       <UserVideoComponent streamManager={sub} />
  //                     </div>
  //                   );
  //                 }
  //               })}
  //             </div>
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   </Wrapper>
  // );
};

export default LivePage;
