import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import {LectureInfoSimple} from '../../components/carts/LectureInfoSimple';
import {deleteCartItem} from '../../api/cart'
import { enrollLecture } from '../../api/pay';

const Wrapper = styled.div`
  width:90%;
  height: 52vh;
  text-align:center;
  margin : 5% auto;
  vertical-align : middle;
  p {
    margin : 10px 0;
  }
`
const Content = styled.div`
  height: 110%;
  border-radius: 20px;
  border: 0.5px solid #ff2c55;
  display: grid;
  grid-template-rows: 1fr 1fr 50fr 1fr;
  padding : 20px 40px;
`
const LecList = styled.div`
  border-top: 2px solid #4a4a4a;
  height: 85%;
  overflow: auto;
  margin-top:10px;
  
`
const Summary = styled.div`
  margin : auto;
  width:80%;
  font-size:1.3rem;
  font-weight: bold;
  .span-right{
    float: right;
    
  }
  .span-left{
    float: left;
  }
`
const Buttons = styled.div`
  button{
    margin : 20px 10px;
  }

`
const PayCompelete = () => {
  
  const [delDone, setDelDone] = useState(false);
  const [addDone, setAddDone] = useState(false);
  const {state} = useLocation();
  

  useEffect( () =>{
    // 장바구니에서 삭제
    state.list.forEach(element => {
      deleteCartItem(element.cartItemId)
      .then((res)=>{
        console.log("삭제 완료");
        setDelDone(true);
      }).catch((err)=>{
        console.log(err);
      })
    });


    const data = {
      lecIds : state.list.map(ele=> ele.lecId),
      userId : state.user.userId,
    }
    // 수강 등록
    console.log(data);
    enrollLecture(data)
    .then((res)=>{
      console.log(res);
      setAddDone(true);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    (true && true ? 
    <Wrapper>
      <Content>
          <h2>결제가 완료되었습니다.</h2>
          <p>주문 번호 220855</p>
        <LecList className='scroll'>
          {state.list.map((item,i)=>(
            <LectureInfoSimple data={item} key={i}/>
          ))}
        </LecList>
        <Summary>
            <span className='span-left'>총 결제 금액</span>
            <span className='span-right'>
              {state.amount}
            </span>
          </Summary>
        </Content>

        <Buttons>
          <Link to="/lectures"><Button content="강의 더보기" /></Link>
          <Link to={`/accounts/profile/${state.user.userNickname}`}><Button content="내 수강목록" /></Link>
        </Buttons>
    </Wrapper>
    :<div></div>)
  );
};
export default PayCompelete;
