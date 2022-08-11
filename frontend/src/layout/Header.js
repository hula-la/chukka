import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import MenuItems from '../components/MenuItems';
import { useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const NavBar = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  font-family: 'Russo One', sans-serif!importance; 
  // font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  & .nav-area {
  }
  & .logo {
    text-decoration: none;
    font-size: 25px;
    color: inherit;
    margin-right: 20px;
  }
  & .menus {
    display: flex;
    list-style: none;
  }
  & .user-div {
    display: flex;
  }
`;

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Lectures',
      submenu: [
        {
          title: 'Lectures',
          url: '/Lectures',
        },
        {
          title: 'Lectures Live',
          url: '/Lectures/live',
        },
      ],
    },
    {
      title: 'Snacks',
      url: '/Snacks',
    },
    {
      title: 'Games',
      url: '/Games',
    },
  ];
  return (
    <NavBar>
      <NavLink to="/" className="logo">
        Chukka
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
          <div>
            <NavLink to={`/accounts/profile/${userInfo.userNickname}`}>
              <div className="user-div">
                {/* <img src={userInfo.userProfile} alt="" /> */}
                <div>Hi, {userInfo.userNickname}!</div>
              </div>
            </NavLink>
            <button
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </NavBar>
  );
};

export default Header;
