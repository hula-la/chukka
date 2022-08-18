import styled from 'styled-components';

const Lecture = styled.div`
  border-bottom: 2px solid #4a4a4a;
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 1fr 1fr;
  place-items: center;
  column-gap: 10px;
  padding : 5px 5px;

  img{
    width : 80%;
    height :60px;
  }
`;

export const LectureInfoSimple = ({data},key) =>{
  return (
    <Lecture>
      <img  src={data.thumbnail} alt="강의 이미지"></img>
      <p>{data.lecTitle}</p>
      <p>{data.insName}</p>
      <div>
        <p>{data.lecSchedule}</p>
        <p>{data.lecDayAndTime}</p>
      </div>
      <div>{data.lecPrice} 원</div>
    </Lecture>
  )
}
