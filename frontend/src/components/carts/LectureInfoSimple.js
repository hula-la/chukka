import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import styled from 'styled-components';

const CartItem = styled.div`
  // border-style:solid;
  // border-color : white;
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
`
const BadgeDiv = styled.div`
  display: flex;
  & div {
    margin-right: 10px;
  }
`;

export const LectureInfoSimple = ({data},key) =>{
  return (
    <CartItem>
      <img  src={data.thumbnail}></img>
      <p>{data.lecTitle}</p>
      <p>{data.insId}</p>
      <div>
        <p>{data.lecSchedule}</p>
        <p>{data.lecDayAndTime}</p>
      </div>
      <div>{data.lecPrice} 원</div>
    </CartItem>
  )
}
