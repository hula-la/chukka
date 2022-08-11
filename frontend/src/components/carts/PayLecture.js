import styled from 'styled-components';

const PayLectureItem = styled.p`
margin-top:10px;
height:25px;
  .payTitle{
    float: left;
  }
  .payPrice{
    float: right;
  }
`
export const PayLecture = ({data},key) =>{
  return(
    <PayLectureItem>
      <span className='payTitle'>{data.lecTitle}</span>
      <span className='payPrice'><strong>{data.lecPrice}원</strong></span>
    </PayLectureItem>
  )
}