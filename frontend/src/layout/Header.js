import { NavLink, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import MenuItems from '../components/MenuItems';
import { useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../img/logo1.png';
import { useEffect } from 'react';
import { userCartCount } from '../features/cart/cartActions';

const NavBar = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  /* padding: 0 20px; */
  height: 80px;
  font-family: 'Russo One', sans-serif !important;
  // font-family: 'Montserrat', sans-serif;
  // font-weight: 600;

  & .nav-area {
  }
  & .logo {
    text-decoration: none;
    font-size: 25px;
    color: inherit;
    margin-right: 20px;
  }

  .logo img {
    margin-top: 0.8rem;
    margin-left: -10px;
    width: 10rem;
    height: 3rem;
  }

  & .menus {
    display: flex;
    list-style: none;
  }
  & .user-div {
    display: flex;
  }

  .user-info {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    place-items: center;
    vertical-align: middle;
  }

  .user-info .user-div {
    vertical-align: middle;
    place-items: center;
    vertical-align: middle;
    margin: 0 0.1rem 0 0.1rem;
  }
  .user-info .cart-icon {
    margin-bottom: 0.2rem;
    width: 100%;
    height: 100%;
  }
  .cart-num {
    font-size: 0.5rem;
    text-align: center;
    z-index: 10;
    position: relative;
    top: 0.5rem;
    left: 0.7rem;
    border-radius: 3rem;
    background-color: #ff2c55;
    width: 1.2rem;
    padding: 2px;
  }
  .btn {
    background-color: #0b0b0b;
    border: solid 1px #ff2c55;
    border-radius: 24px;
    padding: 3px 8px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn:hover {
    background-color: #ff2c55;
  }
`;

const Logo = styled.div``;

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Lectures',
      url: '/lectures',
      submenu: [
        {
          title: 'Lectures Video',
          url: '/lectures/1/section/1',
        },
        {
          title: 'Lectures Live',
          url: '/lectures/live',
        },
      ],
    },
    {
      title: 'Games',
      url: '/games',
    },
    {
      title: 'Snacks',
      url: '/snacks',
    },
  ];

  // 장바구니 카운트
  useEffect(() => {
    dispatch(userCartCount());
  }, [dispatch]);

  const { cartCount } = useSelector((state) => state.cart);

  return (
    <NavBar>
      <NavLink to="/" className="logo">
        <img src={logo} />
      </NavLink>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} location={location} />;
        })}
      </ul>
      <div>
        {!userInfo ? (
          <NavLink to="/accounts/login">
            <Button content="Sign In" />
          </NavLink>
        ) : (
          <div className="user-info">
            <NavLink to={`/accounts/cart`} className="cart-icon">
              <div className="cart-info">
                {cartCount !== undefined && (
                  <div className="cart-num">{cartCount}</div>
                )}
                <ShoppingCartIcon />
              </div>
            </NavLink>
            <NavLink to={`/accounts/profile/${userInfo.userNickname}`}>
              <div className="user-div">
                <p>{userInfo.userNickname}</p>
              </div>
            </NavLink>
            <Link to="/">
              <button
                className="btn"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </NavBar>
  );
};

export default Header;
