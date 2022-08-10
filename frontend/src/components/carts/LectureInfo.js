import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import styled from 'styled-components';

const CartItem = styled.div`
  // border-style:solid;
  // border-color : white;
  border-bottom: 2px solid #4a4a4a;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  column-gap: 10px;
  padding : 10px 5px;

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
      <img  src={data.thumbnail}></img>
      <div>
        <p>{data.lecTitle}</p>
        <p>{data.insId}</p>
        <BadgeDiv>
          <LevelBadge level={data.lecLevel} />
          <CategoryBadge  category={data.lecGenre} />
          <CategoryBadge category={data.lecCategory} />
        </BadgeDiv>
      </div>
      <div>
        <p>{data.lecSchedule}</p>
        <p>{data.lecDayAndTime}</p>
        <p>남은 인원 {data.lecLimit - data.student}명</p>
      </div>
      <div>{data.lecPrice} 원</div>
    </CartItem>
  )
}
