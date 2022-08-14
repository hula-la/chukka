import styled from 'styled-components';

const PayLectureItem = styled.p`
margin-top:10px;
padding: 0 5%;
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
      <span className='payPrice'>{data.lecPrice} 원</span>
    </PayLectureItem>
  )
}