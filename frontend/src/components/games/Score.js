import { useEffect, useState } from 'react';
import styled from "styled-components"

let interval1 = undefined;
let interval2 = undefined;
let interval3 = undefined;

const Score = (props) =>{
  const Score = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  /* border : solid 1px white; */
  width: 100%;
`
  const ScoreItem = styled.div`
    margin: auto 0;
    display:flex;
    width:100%;
    padding: 0 2rem;
    .score-title{
      font-size:2rem;
      width:200px;
    }
    progress{
      appearance: none;
      width: 100%;
      margin: auto 1rem;
      height: 1.5rem;
    }
    progress::-webkit-progress-value{
      background : yellow; 
      border-radius: 30px;
      
    }
    progress::-webkit-progress-bar{
      border-radius: 30px;
    }
  `
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  useEffect(() => {

    console.log(props.result[0].name);

      interval1 = setInterval( () => {
        setProgress1((prev) => prev + 1);
      },10);
      interval2 = setInterval( () => {
        setProgress2((prev) => prev + 1);
      },10);
      interval3 = setInterval( () => {
        setProgress3((prev) => prev + 1);
      },10);


      return () =>{
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
      } 

  }, []);

  useEffect(() => {
    if (progress1 === props.result[0].count) {
      clearInterval(interval1);
    }
    if (progress2 === props.result[1].count) {
      clearInterval(interval2);
    }
    if (progress3 === props.result[2].count) {
      clearInterval(interval3);
    }
  }, [progress1,progress2,progress3]);

  return(
    <Score>
      <ScoreItem>
        <div className='score-title'>{props.result[0].name}</div>
        <progress id="progress" value={progress1} min="0" max="100"></progress>
      </ScoreItem>
      <ScoreItem>
        <div className='score-title'>{props.result[1].name}</div>
        <progress id="progress" value={progress2} min="0" max="100"></progress>
      </ScoreItem>
      <ScoreItem>
        <div className='score-title'>{props.result[2].name}</div>
        <progress id="progress" value={progress3} min="0" max="100"></progress>
      </ScoreItem>
    </Score>
  )
}

export default Score;