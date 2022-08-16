import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import './result.css'
import CountUp from 'react-countup';
import pop from '../../img/pop.jpeg';
import defaultImage from '../../img/default.jpeg';
import Score from '../../components/games/Score';
import { produceWithPatches } from 'immer';
// import gameResultSound from '../../img/gameResultSound.mp3';

/**
 * 노래 id로 노래 정보 가져오기
 * user nickname 가져오기
 */
const GameResult = styled.div`

  margin: 1.5rem;
  padding : 2% 10%;
  display: grid;
  height:94vh;
  grid-template-rows: 1fr 8fr;
`
const Header=styled.div`
  font-size: 3rem;
  margin-bottom:1rem;
`
const Content = styled.div` 
  display: grid;
  grid-template-rows: 1fr 2fr 0.5fr;
  height: 100%;
`
const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  padding-bottom: 1rem;
  img{
    width: 90%;
  }
`
const Song=styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  div{
    padding-left:1rem;
  }
`
const SongTitle=styled.div`
  font-size: 3rem;
  margin:auto 0;
`
const Singer=styled.div`
  font-size: 2rem;
  margin:auto 0;
`
const Player=styled.div`
  display: flex;
  width:100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
  }
  div{
    margin : auto 0 auto 3rem;
  }
`
const DetailScore = styled.div`
  border-top : solid 3px #ff2c55;
  border-bottom : solid 3px #ff2c55;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 90%;
`

const Rank = styled.img`
  width:200px;
  margin:auto;
`

const Count = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
`
const CountItem = styled.div`
  color:white;
  margin: auto 0;
  display:flex;
  width:100%;
  padding: 0 2rem;
  font-size:2.5rem;
`
const TotalScore = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width:100%;
  height: fit-content;
  margin-bottom:  1rem;
  font-size: 4rem;
  text-align: center;
  font-style: italic;
  .div-right{
    margin: auto 0;
    padding: 0 1rem;
    
  }
  .div-left{
    margin: auto 0;
  }
`
const Rainbow=styled.div`
  margin:auto;
  width: 100%;
  @keyframes sparkle {
    from {
      background-position: 0% 100%;
    }
    to {
      background-position: 200% 100%;
    }
  }

.background {
  background: #0b0b0b;
  border-radius: 4px;
  position: relative;
}
.background:before {
  animation: sparkle 10s infinite linear;
  background: linear-gradient(
  90deg,
  #a41dff  0%,
  #FFF689 11%,
  #EC0B43 22%,
  #a41dff  33%,
  #FFF689 44%,
  #EC0B43 55%,
  #a41dff  66%,
  #FFF689 77%,
  #EC0B43 88%,
  #a41dff  100%
  );
  background-size: 300% 100%;
  content: '';
  position: fixed;
  left: 0;
  top:0;
  
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: blur(3px);
  z-index: -1;
  transform: scale(0.99) translateY(3px);
}
`
const ResultPage = () => {
  const [total, setTotal] = useState(0);
  const [rank, setRank] = useState(0);
  const [result, setResult] = useState([]);
  const state = useLocation();

  const rankImgData = [
    "rank_c.jpg",
    "rank_b.jpg",
    "rank_a.jpg",
    "rank_s.jpg",
    "rank_ss.jpg",
  ]
  const calcTotal = () => {
   return 234;
  }
  const calcRank = ()=>{
    return 3;
  }

  useEffect(()=>{
    setResult(state.state.data);
    console.log(result);
    console.log(state.state.data);
    // 최종 점수 계산
    setTotal(()=> calcTotal());
     // 랭크 
    setRank(()=>calcRank());
  },[])
  return (
    <Rainbow>
    <GameResult className='background'>
      <Header>
        <span>RESULT</span>
      </Header>
      <Content>
        <Info>
          <img src={pop}></img>
          <Song>
            <SongTitle>Pop</SongTitle>
            <Singer>나연</Singer>
          </Song>
          <Player>
            <div>
              <img src={defaultImage} alt="프로필 사진"></img>
              <p>user4</p>
            </div>
          </Player>
        </Info>
        <DetailScore>
          <Rank  src={require(`../../img/${rankImgData[3]}`)}></Rank>
            <Score result={state.state.data}></Score>
          <Count>
          {state.state.data.map((item,i)=>{return(
            <CountItem>
              <CountUp end={item.count} duration={0.005*item.count}/>
            </CountItem>
            )
          })}
          </Count>
        </DetailScore>
        <TotalScore>
          <div className='div-left'>Score</div>
          <CountUp className='div-right' end={total} duration={0.5}/>
        </TotalScore>
      </Content>
    </GameResult>
    </Rainbow>
  );
};

export default ResultPage;