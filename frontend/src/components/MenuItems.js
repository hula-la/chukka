import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const NavItems = styled.li`
  position: relative;
  font-size: 1.2rem;
  margin-left: 2rem;

  & a {
    display: block;
    font-size: inherit;
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
  & .nav-link:hover:before {
    transform: scale3d(1, 1, 1);
  }
`;

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <NavItems>
      {items.submenu ? (
        <div
          onMouseOver={() => setDropdown(true)}
          onMouseOut={() => setDropdown(false)}
        >
          <a
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            className="nav-link"
          >
            {items.title}{' '}
          </a>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </div>
      ) : (
        <NavLink to={`/${items.title}`} className="nav-link">
          {items.title}
        </NavLink>
      )}
    </NavItems>
  );
};

export default MenuItems;
