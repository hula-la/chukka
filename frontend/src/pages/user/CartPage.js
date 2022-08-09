import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { getCartList, deleteCartItem } from '../../api/cart';
import {LectureInfo} from '../../components/carts/LectureInfo';
import { PayLecture } from '../../components/carts/PayLecture';

import RequestPay from '../../components/carts/requestPay'; 


const ProfilePageBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 1rem 1rem 0 1rem;
  align-items: flex-start;
  height:100%;
  .icon{
    cursor : pointer;
    margin : auto;
  }
`;
// 사이드바 css
const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height : 100%;
  position : relative;

  .title{
    text-align : center;
    margin-top: 1rem;
    font-size : 1.2rem;
  }
`;
const Profile = styled.div`

  img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;

  }
  p{
    text-align : center;
    margin-bottom: 1rem;
  }
  
`
const Cart = styled.div`
  border-left: 2px solid #ff2c55;
  width:100%;
  height: 70vh;
  padding-left : 10px;
`

const CartList = styled.div`
  // border-style : solid;
  // border-color : white;
  width:100%;
  padding: 0 10px;

`
const CartLecInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 50fr 1fr;
`

const PayList = styled.div`
// border-style : solid;
// border-color : white;
  border-top: 2px solid #ff2c55;
  width : 100%;
  padding-top : 3%;
  padding-bottom : 7%;
  text-align : center;
  `

const PayResult = styled.div`
// border-style : solid;
// border-color : white;
width : 100%;
.span-right{
  float: right;
}
.span-left{
  float: left;
}


`
const CartPage = () => {  

  const [lectures,setLectures] = useState([]);
  const [checkedItems,  setCheckedItems] = useState([]); // 선택된 lecture 객체 저장
  const [checkedIds, setCheckedIds] = useState([]);      // 체크 표시를 위해 선택된 객체의 id값만 저장
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo,setUserInfo] = useState({});

  useEffect(()=>{
    getCartList("user1").then((data)=>{
      if(data.data){
    
        setLectures(
          ...lectures,
          data.data);
    
        setCheckedItems(
            ...checkedItems,
            data.data);
    
        setCheckedIds(...checkedIds,
          data.data.map(item=>item.cartItemId)
          );
          /* 사용자 정보 불러오기 */
          setUserInfo(
            {
              user_id : "user1",
              buyer_email: "lye0626@gmail.com",
              buyer_name: "홍길동", 
              buyer_tel: "010-4242-4242", 
            }
          );
      }
    });


  },[])

  useEffect(()=>{
    setTotalPrice(()=>calcPrice());
  },[checkedItems]);


  const calcPrice=()=>{
    var total = 0;
    checkedItems.forEach((item)=>{total += item.lecPrice})
    return total;
  }

  const checkedItemHandler = (data, isChecked) => {
    const item = JSON.parse(data);
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
      setCheckedIds([...checkedIds, item.cartItemId]);
    } else if (!isChecked) {
      setCheckedItems(checkedItems.filter(el => el.cartItemId !== item.cartItemId));
      setCheckedIds(checkedIds.filter(el => el !== item.cartItemId ));
    }
  };

  const checkHandler = ({ target }) => {
    checkedItemHandler(target.value, target.checked);
  };

  const deleteItem = (id)=>{
    deleteCartItem(id).then((res)=>{
      if(res.data.message==="Success"){
        getCartList("user1").then((data)=>{
          if(data.data){
            setLectures(
             data.data);
        
            setCheckedItems(
              data.data);
        
            setCheckedIds(
              data.data.map(item=>item.cartItemId)
              );
          }else{
            setLectures([]);
         
             setCheckedItems([]);
         
             setCheckedIds([]);
          }
        });
      }else{
        console.log(res.data.message);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <ProfilePageBlock>
      <Side>
          <h3>구매자 정보</h3>
          <Profile>
            <img src="/img/login.png"></img>
            <p> 이연의 </p>
          </Profile>
          <PayList>
            <h3>결제 정보</h3>
            {checkedItems && checkedItems.map((payLec, i)=>(
              <PayLecture data={payLec} key={i}/>
            ))}
          </PayList>
          <PayResult>
            <span className="span-left">총 결제 금액</span>
            <span className='span-right'>{totalPrice}</span>
            <RequestPay user={userInfo} price={totalPrice} payList={checkedItems}/>
          </PayResult>
          
      </Side>
      <Cart>
        <h3>장바구니</h3>
        <CartList>
            {lectures.length>0 ? lectures.map((lecture,i)=>(
              <CartLecInfo>
                <input type="checkbox" value={JSON.stringify(lecture)} checked={checkedIds.includes(lecture.cartItemId) ? true : false} onChange={(e) => checkHandler(e)}></input>
                <LectureInfo data={lecture} key={i} {...lecture}/>
                <CloseIcon className="icon" onClick={()=>deleteItem(lecture.cartItemId)}/>
              </CartLecInfo>
            )):<div>장바구니에 담긴 강의가 없습니다.</div>}      
        </CartList>
      </Cart>
    </ProfilePageBlock>
  );
};
export default CartPage;
