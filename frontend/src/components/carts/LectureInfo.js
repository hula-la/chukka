import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import styled from 'styled-components';

const CartItem = styled.div`
  // border-style:solid;
  // border-color : white;
  margin-top:10px;
  border-bottom: 2px solid #4a4a4a;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  column-gap: 10px;
  row-gap:10px;
  padding : 20px 5px 20px 15px;

  img{
    width : 100%;
    height : 90px;
  }
`
const BadgeDiv = styled.div`
  display: flex;
  & div {
    margin-right: 10px;
  }
`;

export const LectureInfo = ({data},key) =>{
  return (
    <CartItem>
      <img  src={data.thumbnail} alt="강의 이미지"></img>
      <div>
        <p>{data.lecTitle}</p>
        <p>{data.insName}</p>
        <BadgeDiv>
          <LevelBadge level={data.lecLevel} />
          <CategoryBadge  category={data.lecGenre} />
          <CategoryBadge category={data.lecCategory} />
        </BadgeDiv>
      </div>
      <div>
        {/* <p>{data.lecSchedule}</p>
        <p>{data.lecDayAndTime}</p> */}
        <p>남은 인원 <span>{data.lecLimit - data.student}명</span></p>
      </div>
      <div>{data.lecPrice} 원</div>
    </CartItem>
  )
}
