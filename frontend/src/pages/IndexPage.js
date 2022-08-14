<<<<<<< HEAD
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import "./index.css";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import FormatQuoteSharpIcon from '@mui/icons-material/FormatQuoteSharp';


const Container = styled.div`
  width:100%;
  display : grid;
  grid-template-rows : 1fr 1fr 1fr;
  .btn{    
    animation: fadeInUp 2.5s;
    margin-top : 3rem;
    position : absolute;
    width:100%;
    left : 0;
    font-size:40px;
  }
  .icon{
    animation: motion 0.5s linear 0s infinite alternate; margin-top: 10px;
    font-size : 50px
  }
  
`
const BackGround = styled.div`  
  .wrapper{
  //border-style : solid;
  //border-color : white;
    width:100%;
    height: 95%;
    left : 0;
  }
  
  video{
    width:100%; 
    height:100%;
    object-fit:cover;
    opacity : 0.5;
    min-height:800px;
  }

  .content {
    position : absolute;
    width:100%;
    left : 0;
    top : 31%;
    
    font-weight: 600;
    text-align:center;
  }
  .main{
    width: 100%;
    padding:30px;
    background: black;
  }
  .content .title{
    position: relative;
    animation: fadeInUp 2s;
    color : #ff2c55;
    font-size : 120px;
  }

  .content .subTitle{
    position: relative;
    animation: fadeInUp 1.5s;
    font-size : 70px;
  }
  
`
const Introduce = styled.div`
 .fadeInUp{
    animation: fadeInUp 2s;
 }
  text-align: center;
  .wapper{
    margin-top : 80px;
  }
  img{
    width : 700px;
  }
  .title{
    font-size:80px;
    margin-bottom:80px;
  }
  .context{
    font-size:30px;
    line-height:40px;
    margin-bottom:60px;
  }
  .quote{
    font-size: 50px;
  }
  .flipped{
=======
import { useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormatQuoteSharpIcon from '@mui/icons-material/FormatQuoteSharp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Container = styled.div`
  overflow: overlay;

  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  .btn {
    animation: fadeInUp 2.5s;
    position: absolute;
    width: 100%;
    left: 0;
    font-size: 40px;
  }
  .icon {
    animation: motion 0.5s linear 0s infinite alternate;
    margin-top: 10px;
    font-size: 50px;
  }
`;
const BackGround = styled.div`
  .wrapper {
    //border-style : solid;
    //border-color : white;
    width: 100%;
    height: 95%;
    left: 0;
  }
  .btn {
    margin-top: 3rem;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    min-height: 800px;
  }

  .content {
    position: absolute;
    width: 100%;
    left: 0;
    top: 31%;

    font-weight: 600;
    text-align: center;
  }
  .main {
    width: 100%;
    padding: 30px;
    background: black;
  }
  .content .title {
    position: relative;
    animation: fadeInUp 2s;
    color: #ff2c55;
    font-size: 120px;
  }

  .content .subTitle {
    position: relative;
    animation: fadeInUp 1.5s;
    font-size: 70px;
  }
`;
const Introduce = styled.div`
  .fadeInUp {
    animation: fadeInUp 2s;
  }
  text-align: center;
  .wapper {
    margin-top: 80px;
  }
  img {
    width: 700px;
  }
  .btn {
    margin-top: 3rem;
  }
  .title {
    font-size: 80px;
    margin-bottom: 80px;
  }
  .context {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 60px;
  }
  .quote {
    font-size: 50px;
  }
  .flipped {
>>>>>>> develop/front
    transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
  }
<<<<<<< HEAD
  .higtlight{
    color : #ff2c55;
  }
`

const Service = styled.div`
  text-align:center;
  margin-top:80px;
  padding : 30px;
  display : grid;
  grid-template-rows : 4fr 1fr;

 
`
const ServiceContainer = styled.div`
  display : grid;
  grid-template-columns : 1fr 1fr 1fr;
`
const ServiceItem = styled.div`
  margin : 20px 10px;
  border : 0.5px;
  .head{
    // border-style : solid;
    // border-color : white;
    margin-top:40px;
    font-size : 50px;
  }
 .head p{
  width:100%;
  font-size:25px;
 }
 .container{
  width:350px;
  height:350px;
  margin : 10% auto;
  // padding:20% 0;
  border-style : solid;
  border-color : white;
 }
 .title{
  font-size : 50px;
  padding: 42% 0;
  display:block;
 }

 .content{
  padding : 28.5% 0;
  font-size : 20px;
  // opacity:0;
  display:none;
  
 }

 .content .link{
  margin-top : 10%;
  padding 10px;
  font-size: 40px;
 }

 .container:hover .content{
  // opacity:1;
  display:block;
 }

 .container:hover .title {
  opacity:0;
  display:none;
  color:red;
 }

 
 
`

const Join = styled.div`
  text-align : center;
`

const IndexPage = () => {
  
  useEffect(()=>{
    var video = document.querySelector("#video"); 
    if(video.paused){ 
      video.play();  
    }



  },[])

  const goSection2 = () =>{
    const el = document.getElementById("introduce");
    el.classList.add("fadeInUp");
  }
  
  return (
    <Container>
      <BackGround>
        <div className='wrapper'>
          <video autoPlay muted loop id="video">
            <source src="img/index_video.mp4" type="video/mp4"/>
          </video>
          <div className="content">
            <div className="main">
              <p className='subTitle'>dance with</p>
              <p className="title">CHUKKA</p>
            </div>
            <div className="btn">
              <a href="#introduce" onClick={()=>goSection2()} >Shall We Dance?<br/>
              <KeyboardDoubleArrowDownIcon className='icon'/>
              </a>
            </div>
            
          </div>
        </div>
      </BackGround>
      
      <Introduce  id="introduce">
        <div className="wapper">
          <img  src="img/neon1.png"></img>
=======
  .higtlight {
    color: #ff2c55;
  }
`;

const Service = styled.div`
  text-align: center;
  padding: 20px 30px;
  display: grid;
  grid-template-rows: 5fr 2fr;
  width: 100vw;
`;
const ServiceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const ServiceItem = styled.div`
  margin: 20px 10px;
  .head {
    // border-style : solid;
    // border-color : white;
    margin-top: 40px;
    font-size: 50px;
  }
  .head p {
    width: 100%;
    font-size: 25px;
  }
  .container {
    width: 350px;
    height: 350px;
    margin: 10% auto;
    // padding:20% 0;
    border-style: solid;
    border-color: white;
  }
  .title {
    font-size: 50px;
    padding: 42% 0;
    display: block;
  }

  .content {
    padding: 28.5% 0;
    font-size: 20px;
    // opacity:0;
    display: none;
  }

  .content .link {
    margin-top: 10%;
    padding: 10px;
    font-size: 40px;
  }

  .container:hover .content {
    // opacity:1;
    display: block;
  }

  .content .link {
    margin-top: 10%;
    padding: 10px;
    font-size: 40px;
  }

  .container:hover .title {
    // opacity:0;
    display: none;
  }
`;

const Join = styled.div`
  text-align: center;
  .icon {
    animation: motionX 0.7s linear 0s infinite alternate;
    margin-top: 10px;
    font-size: 50px;
    position: absolute;
    margin-top: 0;
  }
`;

const IndexPage = () => {
  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);

  useEffect(() => {
    var video = document.querySelector('#video');
    if (video.paused) {
      video.play();
    }
  }, []);

  const goSection2 = () => {
    const el = document.getElementById('introduce');
    el.classList.add('fadeInUp');
  };

  return (
    <Container>
      <BackGround className="section-1">
        <div className="wrapper">
          <video autoPlay muted loop id="video">
            <source src="img/index_video.mp4" type="video/mp4" />
          </video>
          <div className="content" ref={section1}>
            <div className="main">
              <p className="subTitle">dance with</p>
              <p className="title">CHUKKA</p>
            </div>
            <div className="btn">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault(e);
                  section2.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Shall We Dance?
                <br />
                <KeyboardDoubleArrowDownIcon className="icon" />
              </a>
            </div>
          </div>
        </div>
      </BackGround>

      <Introduce id="introduce" ref={section2} className="section-2">
        <div className="wapper">
          <img src="img/neon1.png"></img>
>>>>>>> develop/front
          <p className="title">
            {/* <FormatQuoteSharpIcon className='quote flipped'/>
            우리 함께 춤 출까?
            <FormatQuoteSharpIcon className='quote'/> */}
          </p>
          <p className="context">
<<<<<<< HEAD
            CHUKKA 는 <span className="higtlight">"우리 함께 춤 출까"</span>의 줄임말로 <br/>
            즐거움을 배우고, 함께 놀며, 시간을 나누는<br/>
            <span className='higtlight'>너와 나의 연결</span>을 가치로 둡니다.
          </p>
          <div className="btn">
              <a href="#service" >Let's Dance !</a><br/>
              <KeyboardDoubleArrowDownIcon className='icon'/>
            </div>
        </div>
      </Introduce>
      <Service id="service" >
        <ServiceContainer>
        <ServiceItem>
          <div>
            <div class="head">  
              <p>HOW</p>
              Learn ?
            </div>
            <div class="container">
              <div class="content">
               댄서의 실시간 라이브 강의와<br/>
                녹화 강의로 춤을 배워 보세요
                <div class="link"><Link to="lectures">Lecture</Link></div>
              </div>
              <div class="title">Lecture</div>
            </div>
          </div>
        </ServiceItem>
        <ServiceItem>
          <div>
            <div class="head">
              <p>HOW</p>
              Play ?
            </div>
            <div class="container">
              <div class="content">
                게임을 통해 춤을 즐기고<br/>
                대결을 펼쳐보세요
                <div class="link"><Link to="games">Game</Link></div>
              </div>
              <div class="title">Game</div>
            </div>
          </div>
        </ServiceItem>
        <ServiceItem>
          <div>
            <div class="head">
              <p>HOW</p>
              Share ?
            </div>
            <div class="container">
              <div class="content">
                짧게 즐길 수 있는 Snacks를 통해 <br/>
                춤을 공유하고 구경해보세요.<br/>
                <div className='link'><Link to="snacks">Snacks</Link></div>
              </div>
              <div class="title">Snacks</div>
            </div>
          </div>
        </ServiceItem>
        </ServiceContainer>
        <Join>
          Join Us
        </Join>
      </Service>
      
=======
            CHUKKA 는 <span className="higtlight">"우리 함께 춤 출까"</span>의
            줄임말로 <br />
            즐거움을 배우고, 함께 놀며, 시간을 나누는
            <br />
            <span className="higtlight">너와 나의 연결</span>을 가치로 둡니다.
          </p>
          <div className="btn">
            <a
              href=""
              onClick={(e) => {
                e.preventDefault(e);
                section3.current.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let's Dance !<br />
              <KeyboardDoubleArrowDownIcon className="icon" />
            </a>
          </div>
        </div>
      </Introduce>
      <Service id="service" ref={section3}>
        <ServiceContainer>
          <ServiceItem>
            <div>
              <div className="head">
                <p>HOW</p>
                Learn ?
              </div>
              <div className="container">
                <Link to="lectures" className="content">
                  댄서의 실시간 라이브 강의와
                  <br />
                  녹화 강의로 춤을 배워 보세요
                  <div className="link">
                    Lecture
                    <PlayArrowIcon className="arrow-icon" />
                  </div>
                </Link>
                <div className="title">Lecture</div>
              </div>
            </div>
          </ServiceItem>
          <ServiceItem>
            <div>
              <div className="head">
                <p>HOW</p>
                Play ?
              </div>
              <div className="container">
                <Link to="games" className="content">
                  게임을 통해 춤을 즐기고
                  <br />
                  대결을 펼쳐보세요
                  <div className="link">
                    Game
                    <PlayArrowIcon className="arrow-icon" />
                  </div>
                </Link>
                <div className="title">Game</div>
              </div>
            </div>
          </ServiceItem>
          <ServiceItem>
            <div>
              <div className="head">
                <p>HOW</p>
                Share ?
              </div>
              <div className="container">
                <Link to="snacks" className="content">
                  짧게 즐길 수 있는 Snacks를 통해 <br />
                  춤을 공유하고 구경해보세요.
                  <br />
                  <div className="link">
                    Snacks
                    <PlayArrowIcon className="arrow-icon" />
                  </div>
                </Link>
                <div className="title">Snacks</div>
              </div>
            </div>
          </ServiceItem>
        </ServiceContainer>
        <Join>
          <Link to="accounts/signup">
            <div className="btn">
              Join us !
              <KeyboardDoubleArrowRightIcon className="icon" />
            </div>
          </Link>
        </Join>
      </Service>
>>>>>>> develop/front
    </Container>
  );
};

export default IndexPage;
