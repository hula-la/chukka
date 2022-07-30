import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;
const Profile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

function SideBar() {
  const menus = [
    { name: 'Shorts', path: '/accounts/profile' },
    { name: '나의 강의 목록', path: '/accounts/mylist' },
    { name: '프로필 설정', path: '/accounts/change' },
  ];
  return (
    <Side>
      <hr className="line" />
      <Profile src="/img/login.png"></Profile>
      <hr className="line" />
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{ color: 'gray', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activeStyle={{ color: 'white' }}
            >
              <div menu={menu}>{menu.name}</div>
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}

export default SideBar;
