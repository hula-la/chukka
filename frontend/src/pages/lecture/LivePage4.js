import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useState, useEffect } from 'react';
import UserVideoComponent from '../../components/UserVideoComponent';
import UserModel from '../../models/user-model';
import OpenViduLayout from './openvidu-layout';
import ToolbarComponent from '../../components/lectures/toolbar/ToolbarComponent';
import DialogExtensionComponent from '../../components/lectures/dialog-extension/DialogExtension';
import StreamComponent from '../../components/lectures/stream/StreamComponent';
import ChatComponent from '../../components/lectures/chat/ChatComponent';

import './VideoRoomComponent.css';

const LivePage = (props) => {
  var localUser = new UserModel();
  var OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  var OPENVIDU_SERVER_SECRET = 'MY_SECRET';
  var hasBeenUpdated = false;
  var layout = new OpenViduLayout();
  var OV = undefined;
  var session = undefined;
  let sessionName = 'SessionA';
  let userName = 'OpenVidu_User' + Math.floor(Math.random() * 100);
  let remotes = [];
  let localUserAccessAllowed = false;
  let showExtensionDialog = false;
  let messageReceived = null;
  const [mySessionId, setMySessionId] = useState(sessionName);
  const [myUserName, setMyUserName] = useState(userName);
  const [stateSession, setStateSession] = useState(undefined);
  const [stateLocalUser, setStateLocalUser] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState('none');
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  useEffect(() => {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions,
    );
    window.addEventListener('beforeunload', onbeforeunload);
    window.addEventListener('resize', updateLayout);
    window.addEventListener('resize', checkSize);
    joinSession();

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('resize', checkSize);
      leaveSession();
    };
  });

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const joinSession = () => {
    OV = new OpenVidu();
    OV.enableProdMode();

    session = OV.initSession();

    subscribeToStreamCreated();
    connectToSession();
  };

  const connectToSession = () => {
    if (props.token !== undefined) {
      console.log('token received: ', props.token);
      connect(props.token);
    } else {
      getToken()
        .then((token) => {
          console.log(token);
          connect(token);
        })
        .catch((error) => {
          if (props.error) {
            console.log(error);
          }
        });
    }
  };

  const connect = (token) => {
    session
      .connect(token, { clientData: myUserName })
      .then(() => {
        connectWebCam();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectWebCam = async () => {
    var devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

    let publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          localUserAccessAllowed = true;
          if (props.joinSession) {
            props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    console.log('publisher', publisher);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    setCurrentVideoDevice(videoDevices[0]);
    setStateLocalUser(localUser);

    const nextFunc = () => {
      localUser.getStreamManager().on('streamPlaying', (e) => {
        updateLayout();
        publisher.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
    };
    nextFunc();
  };

  const updateSubscribers = () => {
    // var subscribers = remotes;
    setSubscribers(remotes);

    const nextFunc = () => {
      if (localUser) {
        sendSignalUserChanged({
          isAudioActive: localUser.isAudioActive(),
          isVideoActive: localUser.isVideoActive(),
          nickname: localUser.getNickname(),
          isScreenShareActive: localUser.isScreenShareActive(),
        });
      }
      updateLayout();
    };
    nextFunc();
  };

  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    session = undefined;
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('OpenVidu_User' + Math.floor(Math.random() * 100));
    setStateLocalUser(undefined);
    localUser = undefined;
    if (props.leaveSession) {
      props.leaveSession();
    }
  };

  const camStatusChanged = () => {};
  const micStatusChanged = () => {};
  const nicknameChanged = (nickname) => {};

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers(remoteUsers);
    }
  };

  const subscribeToStreamCreated = () => {
    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      subscriber.on('streamPlaying', (e) => {
        checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);

      const tmpRemotes = [...remotes];
      tmpRemotes.push(newUser);
      remotes = [...tmpRemotes];
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    // On every Stream destroyed...
    session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream);
      setTimeout(() => {
        checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      updateLayout();
    });
  };

  const subscribeToUserChanged = () => {
    session.on('signal:userChanged', (event) => {
      let remoteUsers = subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      setSubscribers(remoteUsers);
      checkSomeoneShareScreen();
    });
  };

  const updateLayout = () => {
    setTimeout(() => {
      layout.updateLayout();
    }, 20);
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    session.signal(signalOptions);
  };

  const toggleFullscreen = () => {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(localUser.getStreamManager());
          await session.publish(newPublisher);
          localUser.setStreamManager(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setStateLocalUser = localUser;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const screenShare = () => {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      },
    );

    publisher.once('accessAllowed', () => {
      session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        setStateLocalUser(localUser);
        sendSignalUserChanged({
          isScreenShareActive: localUser.isScreenShareActive(),
        });
      });
    });
    publisher.on('streamPlaying', () => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  };

  const closeDialogExtension = () => {
    showExtensionDialog = false;
  };

  const stopScreenShare = () => {
    session.unpublish(localUser.getStreamManager());
    connectWebCam();
  };
  const checkSomeoneShareScreen = () => {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    layout.setLayoutOptions(openviduLayoutOptions);
    updateLayout();
  };

  const toggleChat = (property) => {
    let display = property;

    if (display === undefined) {
      display = chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      setChatDisplay(display);
      messageReceived = false;
    } else {
      console.log('chat', display);
      setChatDisplay(display);
    }
    this.updateLayout();
  };

  const checkNotification = (event) => {
    messageReceived = chatDisplay === 'none';
  };

  const checkSize = () => {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !hasBeenUpdated
    ) {
      toggleChat('none');
      hasBeenUpdated = true;
    }
    if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
      hasBeenUpdated = false;
    }
  };

  //

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
          if (error.response && error.response.status === 409) {
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
      var data = JSON.stringify({});
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
    <div className="container" id="container">
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        // showNotification={messageReceived}
        camStatusChanged={camStatusChanged}
        micStatusChanged={micStatusChanged}
        screenShare={screenShare}
        stopScreenShare={stopScreenShare}
        toggleFullscreen={toggleFullscreen}
        switchCamera={switchCamera}
        leaveSession={leaveSession}
        toggleChat={toggleChat}
      />

      <DialogExtensionComponent
        showDialog={showExtensionDialog}
        cancelClicked={closeDialogExtension}
      />

      <div id="layout" className="bounds">
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div className="OT_root OT_publisher custom-class" id="localUser">
            <StreamComponent
              user={localUser}
              handleNickname={nicknameChanged}
            />
          </div>
        )}
        {subscribers.map((sub, i) => (
          <div
            key={i}
            className="OT_root OT_publisher custom-class"
            id="remoteUsers"
          >
            <StreamComponent
              user={sub}
              streamId={sub.streamManager.stream.streamId}
            />
          </div>
        ))}
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div
            className="OT_root OT_publisher custom-class"
            style={chatDisplay}
          >
            {/* <ChatComponent
              user={localUser}
              chatDisplay={chatDisplay}
              close={toggleChat}
              messageReceived={checkNotification}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePage;
