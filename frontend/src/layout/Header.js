import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import MenuItems from '../components/MenuItems';

const NavBar = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;

  font-family: 'Montserrat', sans-serif;
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
`;

const Header = () => {
  const menuItems = [
    {
      title: 'Lectures',
      submenu: [
        {
          title: 'Lecture1',
        },
        {
          title: 'Lecture2',
        },
      ],
    },
    {
      title: 'Snacks',
    },
    {
      title: 'Games',
    },
  ];
  return (
    <NavBar>
      <NavLink to="/" className="logo">
        Chukka
      </NavLink>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
      <div>
        <NavLink to="/accounts/login">
          <Button content="Sign In" />
        </NavLink>
      </div>
    </NavBar>
  );
};

export default Header;
