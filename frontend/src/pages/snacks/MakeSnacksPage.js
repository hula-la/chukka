import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { fetchMusic } from '../../features/game/gameActions';
import RecordRTC from 'recordrtc';
import styled from 'styled-components';

const Record = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  video {
    margin-top: 1rem;
  }
  audio {
    margin-top: 1rem;
  }
`;
const Title = styled.div`
  font-size: 1.7rem;

`
// const SongTitle = styled.div`
//   margin-top:1rem;
// `

const ButtonDiv = styled.div`
  position: relative;
  margin-left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  .btn-hide{
    visibility: hidden;
  }
`
const StyledButton = styled.button`
  width: 100%;
  margin: 1rem auto 0 auto;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  opacity: 0.8;
  transition: 500ms;
  :hover {
    opacity: 1;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  margin: 1rem 0 0.5rem 0;
  height: 35px;
  width: 65%;
  text-align: center;
  font-size: 1rem;
  border-radius: 7px;
  .options {
    margin: 5px 0;
  }
  option:hover {
    color: yellow;
  }
`;

const CamUploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [songSrc, setSongSrc] = useState("");
  const { musicList } = useSelector((state) => state.game);

  const refVideo = useRef(null);
  const originVideo = useRef(null);
  const recorderRef = useRef(null);
  const refAudio = useRef(null);

  const handleRecording = () => {

    if(songSrc===""){
      alert("노래를 선택해 주세요");
      return;
    }
    setIsRecording(true);
    recorderRef.current = new RecordRTC(stream, { type: 'video' });
    recorderRef.current.startRecording();
    refAudio.current.play();
    
  };

  const playEnd = async () => {
    refAudio.current.pause();
    await recorderRef.current.stopRecording(() => {
      const blob = new Blob([recorderRef.current.getBlob()], {
        type: 'video/mp4',
      });
      console.log('send', blob);
      navigate('/snacks/camupload/', { state: { data: blob } });
    });
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    // songId(value) 값으로 음악 가져오기
    setSongSrc(`https://chukkachukka.s3.ap-northeast-2.amazonaws.com/snacks/music/${e.target.value}`);
  }
  // const HandleMouseEnter = (e)=>{
  //   console.log(e.target.value);
  // }

  const startCam = async () => {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 300, height: 400 },
      audio: true,
    });
    originVideo.current.srcObject = cameraStream;
    setStream(cameraStream);
  };

  useEffect(()=>{
    startCam();
  }, []);

  useEffect(() => {
    dispatch(fetchMusic());
    console.log(musicList);
  }, [dispatch]);

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  return (
    <Record>
      <div>
        <Title>Snacks</Title>
        <audio
          ref={refAudio}
          src={songSrc}
          type="audio/mp3"
          controls
          onEnded={() => playEnd()}
        />
        <StyledSelect onChange={(e) => handleSelect(e)}>
          <option value="" selected disabled hidden>
            {' '}
            -- 노래 선택 --{' '}
          </option>
          {musicList.map((option, i) => {
            return (
              <option
                key={option.songId}
                value={option.songId}
                className="options"
              >
                {option.songName} - {option.singer}
              </option>
            );
          })}
        </StyledSelect>
        
      <div>
      <video
        ref={originVideo}
        autoPlay
        muted
        style={{ width: '300px', height:'400px'}}
      >
      </video>
      </div>
      <ButtonDiv>
        <StyledButton className={isRecording?"btn-hide":""} onClick={handleRecording}>촬영 하기</StyledButton>
      </ButtonDiv>
      </div>
    </Record>
  );
};

export default CamUploadPage;
