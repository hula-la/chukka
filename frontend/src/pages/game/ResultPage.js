import { useEffect } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import pop from '../../img/pop.jpeg';
import rankImg from '../../img/rank_s.jpg'

const GameResult = styled.div`
  width:100%;
  padding : 3% 10%;
  display: grid;
  grid-template-rows: 1fr 8fr;
`
const Header=styled.div`
  font-size: 4rem;
  
`
const Content = styled.div` 
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
`
const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  img{
    width: 100%;
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
  margin-top: 1rem;
`
const Player=styled.div`
  display: flex;
  width:100%;
  height: 100%;
  text-align: center;
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    
  }
  div{
    margin: auto;  
  }
`
const DetailScore = styled.div`
  border-top : solid 2px white;
  border-bottom : solid 2px white;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`

const Rank = styled.img`
  margin:auto;
`

const Score = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  border : solid 1px white;
  width: 100%;
`
const ScoreItem = styled.div`
  margin: auto 0;
  /* border : solid 1px white; */
  display:flex;
  width:100%;
  padding: 0 2rem;
  .score-title{
    font-size:2rem;
    /* border : solid 1px white; */
    width:10rem;
  }
  progress{
    /* border : solid 1px white; */
    width: 100%;
    margin: auto 1rem;
  }
`
const Count = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  border : solid 1px white;
  width: 100%;
  height: 100%;
`
const CountItem = styled.div`
  color:white;
  margin: auto 0;
  /* border : solid 1px white; */
  display:flex;
  width:100%;
  padding: 0 2rem;
  font-size:2.5rem;
`
const TotalScore = styled.div`
  
`



const ResultPage = () => {

  return (
    <GameResult>
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
              <img src={pop} alt="프로필 사진"></img>
              <p>user4</p>
            </div>
          </Player>
        </Info>
        <DetailScore>
          <Rank  src={rankImg}></Rank>
          <Score>
            <ScoreItem>
              <div className='score-title'>Perfect</div>
              <progress id="progress" value="50" min="0" max="100"></progress>
            </ScoreItem>
            <ScoreItem>
              <div className='score-title'>Good</div>
              <progress id="progress" value="50" min="0" max="100"></progress>
            </ScoreItem>
            <ScoreItem>
              <div className='score-title'>Bad</div>
              <progress id="progress" value="50" min="0" max="100"></progress>
            </ScoreItem>
          </Score>
          <Count>
            <CountItem>
              <CountUp end={100} duration={0.5}/>
            </CountItem>
            <CountItem>
              <CountUp end={100} duration={0.5}/>
            </CountItem>
            <CountItem>
              <CountUp end={100} duration={0.5}/>
            </CountItem>
          </Count>
        </DetailScore>
        <TotalScore>
          <div className='div-righwt'>Score</div>
          <div className='div-left'>1251.12</div>
        </TotalScore>
      </Content>
    </GameResult>
  );
};

export default ResultPage;
