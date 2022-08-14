import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import styled from 'styled-components';

const Record = styled.div`
  display: flex;
  justify-content: center;
  video{
    margin-top : 1rem;
  }
`
const Title = styled.div`
  font-size: 1.7rem;

`
const SongTitle = styled.div`
  margin-top:1rem;
`

const ButtonDiv = styled.div`
position : relative;
  margin-left : 50%;
  transform: translate( -50%, 0 );
  text-align: center;
`
const StyledButton = styled.button`
  width:6rem;
  margin : 1rem auto 0 auto;
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


const CamUploadPage=()=> {
  const navigate = useNavigate();
  
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);

  const refVideo = useRef(null);
  const originVideo = useRef(null);
  const recorderRef = useRef(null);
  const refAudio = useRef(null);
  
  
  const handleRecording = () => {
    recorderRef.current = new RecordRTC(stream, { type: 'video' });
    recorderRef.current.startRecording();
    refAudio.current.play();
  };

  const handleStop = () => {
    refAudio.current.pause();
    recorderRef.current.stopRecording(() => {
      setBlob(new Blob([recorderRef.current.getBlob()], { type: 'video/mp4' }));
    });
    console.log("촬영 종료");
  };

  const handleUpload = () => {
    console.log(blob);
    // file 업로드
    const videoURL = URL.createObjectURL(blob);
    console.log(videoURL);
  };

  const handleReset = () =>{
    setBlob(null);
    startCam();
  }

  

  const playEnd = async() =>{
    refAudio.current.pause();
    await recorderRef.current.stopRecording(() => {
      const blob = new Blob([recorderRef.current.getBlob()], { type: 'video/mp4' });
      console.log("send",blob);
      navigate("/snacks/camupload/",{state:{data:blob}});
    });
    
    
  }

  const startCam = async () =>{
    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: {width:300, height:400}, audio:true });
    originVideo.current.srcObject = cameraStream;
    setStream(cameraStream);
  }

  useEffect( async ()=>{
    startCam();
  },[])

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
      <audio ref={refAudio} src="https://chukkadance.s3.ap-northeast-2.amazonaws.com/vid/snacks/demo" type="audio/mp3" controls onEnded={()=>playEnd()}/>
      <SongTitle>현아 - Bubble PoP!</SongTitle>
      <div>
      {!blob &&
      <video
        ref={originVideo}
        autoPlay
        muted
        style={{ width: '300px', height:'400px'}}
      >
      </video>}
      </div>
      <ButtonDiv>
        <StyledButton onClick={handleRecording}>촬영 하기</StyledButton>
      </ButtonDiv>
      </div>
    </Record>
  );
}

export default CamUploadPage;