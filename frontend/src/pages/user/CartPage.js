import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/cart/cartActions';
import CloseIcon from '@mui/icons-material/Close';
import TvOffIcon from '@mui/icons-material/TvOff';
import { getCartList, deleteCartItem, user } from '../../api/cart';
import { LectureInfo } from '../../components/carts/LectureInfo';
import { PayLecture } from '../../components/carts/PayLecture';
import Alert from '../../components/Alert';
import RequestPay from '../../components/carts/requestPay';
import StyledButton from '../../components/Button';

const ProfilePageBlock = styled.div`
  input {
    accent-color: #ff2c55;
  }

  line-height: 25px;
  font-size: 15px;
  color: #ffffffd3;
  display: grid;
  grid-template-columns: 0fr 1.5fr 4fr;
  max-width: 1200px;
  margin: 1rem 1rem 0 1rem;
  height: 100%;
  .icon {
    cursor: pointer;
    margin: auto;
  }
`;
// 사이드바 css
const Side = styled.div`
  // display: flex;
  // flex-direction: column;
  display:grid;
  grid-template-rows : 0.5fr 0.5fr 0.5fr 2fr 1fr;
  -webkit-align-items: center;
  -webkit-box-align: unset;
  justify-content: initial;

  width: 100%;
  height: 70vh;
  position: relative;
  .title {
    text-align: center;
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;
const Profile = styled.div`
  text-align: center;
  border-bottom: 2px solid #ff2c55;
  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }
`;
const Cart = styled.div`
  border-left: 2px solid #ff2c55;
  width: 100%;
  height: 70vh;
  padding-left: 10px;
`;

const CartList = styled.div`
  // border-style : solid;
  // border-color : white;
  width: 100%;
  overflow: scroll;
  padding: 0 10px;
  height: 95%;
`;
const CartLecInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 50fr 1fr;
`;

const PayList = styled.div`
  // border-style : solid;
  // border-color : white;

  width: 100%;
  height: 100%;
  padding: 3% 0;
  text-align: center;
  overflow: scroll;
`;

const PayResult = styled.div`
  // border-style : solid;
  // border-color : white;

  padding: 0 8% 0 5%;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  .span-right {
    float: right;
    color: #ff2c55;
  }
  .span-left {
    float: left;
    color: #ff2c55;
  }
  button {
    margin-top: 5%;
  }
`;

const CartEmpty = styled.div`
  .content {
    text-align: center;
    margin-top: 10%;
  }
  .tv-icon {
    font-size: 150px;
  }
  .content p {
    margin: 5% 0;
  }
`;

const CartPage = () => {
  const [lectures, setLectures] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]); // 선택된 lecture 객체 저장
  const [checkedIds, setCheckedIds] = useState([]); // 체크 표시를 위해 선택된 객체의 id값만 저장
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalMain, setModalMain] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.cart);

  useEffect(() => {
    const currentUser = userInfo.userNickname;
    console.log(currentUser);
    dispatch(fetchUser(currentUser));
    console.log(userInfo);
    console.log(userProfile);

    getCartList(userInfo.userId).then((data) => {
      if (data.data) {
        setLectures(...lectures, data.data);

        setCheckedItems(...checkedItems, data.data);

        setCheckedIds(
          ...checkedIds,
          data.data.map((item) => item.cartItemId),
        );
      }
    });
  }, []);

  useEffect(() => {
    setTotalPrice(() => calcPrice());
  }, [checkedItems]);

  const calcPrice = () => {
    var total = 0;
    checkedItems.forEach((item) => {
      total += item.lecPrice;
    });
    return total;
  };

  const checkedItemHandler = (data, isChecked) => {
    const item = JSON.parse(data);
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
      setCheckedIds([...checkedIds, item.cartItemId]);
    } else if (!isChecked) {
      setCheckedItems(
        checkedItems.filter((el) => el.cartItemId !== item.cartItemId),
      );
      setCheckedIds(checkedIds.filter((el) => el !== item.cartItemId));
    }
  };

  const checkHandler = ({ target }) => {
    checkedItemHandler(target.value, target.checked);
  };

  const deleteItem = (id) => {
    deleteCartItem(id)
      .then((res) => {
        if (res.data.message === 'Success') {
          getCartList('user1').then((data) => {
            if (data.data) {
              setLectures(data.data);

              setCheckedItems(data.data);

              setCheckedIds(data.data.map((item) => item.cartItemId));

              setModalHeader('장바구니 삭제');
              setModalMain('장바구니에서 삭제되었습니다.');

              openModal();
            } else {
              setLectures([]);
              setCheckedItems([]);
              setCheckedIds([]);
            }
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ProfilePageBlock>
      <Alert open={modalOpen} close={closeModal} header={modalHeader}>
        {modalMain}
      </Alert>
      <Side>
        <h3>구매자 정보</h3>
        {userProfile !== null && (
          <Profile>
            <div>
              <img src={userProfile.userProfile} alt="프로필 사진"></img>
            </div>
            <p>{userProfile.userNickname}</p>
          </Profile>
        )}
        <h3>결제 정보</h3>
        <PayList>
          {checkedItems &&
            checkedItems.map((payLec, i) => (
              <PayLecture data={payLec} key={i} />
            ))}
        </PayList>
        <PayResult>
          <div>
            <span className="span-left">총 결제 금액</span>
            <span className="span-right">{totalPrice} 원</span>
          </div>
          <RequestPay
            user={userProfile}
            price={totalPrice}
            payList={checkedItems}
          />
        </PayResult>
      </Side>
      <Cart>
        <h3>장바구니</h3>
        {lectures.length > 0 ? (
          <CartList>
            {lectures.map((lecture, i) => (
              <CartLecInfo>
                <input
                  type="checkbox"
                  value={JSON.stringify(lecture)}
                  checked={
                    checkedIds.includes(lecture.cartItemId) ? true : false
                  }
                  onChange={(e) => checkHandler(e)}
                ></input>
                <LectureInfo data={lecture} key={i} {...lecture} />
                <CloseIcon
                  className="icon"
                  onClick={() => deleteItem(lecture.cartItemId)}
                />
              </CartLecInfo>
            ))}
          </CartList>
        ) : (
          <CartEmpty>
            <div className="wapper">
              <div className="content">
                <TvOffIcon className="tv-icon" />
                <p>장바구니에 담긴 강의가 없습니다.</p>
                <Link to="/lectures">
                  <StyledButton content={'강의 구경하기'}></StyledButton>
                </Link>
              </div>
            </div>
          </CartEmpty>
        )}
      </Cart>
    </ProfilePageBlock>
  );
};
export default CartPage;
