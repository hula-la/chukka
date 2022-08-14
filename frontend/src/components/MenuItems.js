import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const NavItems = styled.li`
  position: relative;
  font-size: 1.2rem;
  margin-left: 2rem;

  & a {
    display: block;
    font-size: 0.95rem;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  & button {
    color: inherit;
    font-size: inherit;
    border: none;
    background-color: transparent;
    width: 100%;
  }

  & a,
  & button {
    text-align: left;
    padding: 0.7rem 0;
    border: 3px solid transparent;
    display: block;
  }
  & .nav-link:before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 2px;
    transform-origin: 0% 50%;
    background-color: #ff2c55;
    transition: transform 0.3s;
    transform: scale3d(0, 5, 1);
    transition-timing-function: cubic-bezier(1, 0.68, 0.16, 0.9);
  }
  & .active:before {
    transform: scale3d(1, 1, 1);
  }
  & .nav-link:hover:before {
    transform: scale3d(1, 1, 1);
  }
  & .nav-link {
    // font-family: 'Montserrat', sans-serif;
<<<<<<< HEAD
    font-family: 'Russo One', sans-serif; 
    font-weight: 600;
=======
    font-family: 'Russo One', sans-serif;
    // font-weight: 600;
    cursor: pointer;
    font-size:1.3rem;
>>>>>>> develop/front
  }
`;

const MenuItems = ({ items, location }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  return (
    <NavItems>
      {items.submenu ? (
        <div
          onMouseOver={() => setDropdown(true)}
          onMouseOut={() => setDropdown(false)}
        >
          <button
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            className={
              location.pathname.split('/')[1] === 'lectures'
                ? 'nav-link button-menu active'
                : 'nav-link button-menu'
            }
            onClick={(e) => navigate(items.url)}
          >
            {items.title}{' '}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </div>
      ) : (
        <NavLink to={items.url} className="nav-link">
          {items.title}
        </NavLink>
      )}
    </NavItems>
  );
};

export default MenuItems;
