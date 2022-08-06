import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import UserVideoComponent from '../../components/UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
const LivePage = () => {
  const [OV, setOV] = useState();
  const [session, setSession] = useState();
  const [initUserData, setInitUserData] = useState({
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
  });
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession();

    return () => {
      console.log('unmounted!');
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

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

    setOV(newOV);
    setSession(newSession);

    const startLecture = () => {
      // const mySession = newOV.session;

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
          .connect(token, { clientData: initUserData.myUserName })
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
              mirror: false, // Whether to mirror your local video or not
            });

            newSession.publish(publisher);

            setCurrentVideoDevice(videoDevices[0]);
            setMainStreamManager(publisher);
            setPublisher(publisher);
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
    startLecture();
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession(null);
    setSubscribers([]);
    setInitUserData({
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
    });
    setMainStreamManager(null);
    setPublisher(null);
  };

  const getToken = async () => {
    return createSession(initUserData.mySessionId).then((sessionId) =>
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
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
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

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{initUserData.mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>
          <div className="row">
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={mainStreamManager} />
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  // onClick={switchCamera}
                  value="Switch Camera"
                />
              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
              {publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => handleMainVideoStream(publisher)}
                >
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LivePage;
