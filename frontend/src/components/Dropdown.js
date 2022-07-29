import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const DropdownDiv = styled.div`
  & .dropdown {
    position: absolute;
    right: 0;
    left: auto;
    box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.16),
      0 4px 6px -2px rgba(71, 63, 79, 0.32);
    font-size: 0.875rem;
    z-index: 9999;
    min-width: 11rem;
    padding: 0.5rem 0.5rem;
    list-style: none;
    border-radius: 0.5rem;
    display: none;
    background: #191919;
  }
  /* & li + li {
    border-top: 1px solid white;
  } */

  & .dropdown.show {
    display: block;
  }

  & .dropdown .dropdown-submenu {
    position: absolute;
    left: 100%;
    top: -7px;
  }
`;

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <DropdownDiv>
      <ul className={`dropdown ${dropdown ? 'show' : ''}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className="menu-items">
            <NavLink to={`/${submenu.title}`}>{submenu.title}</NavLink>
          </li>
        ))}
      </ul>
    </DropdownDiv>
  );
};

export default Dropdown;
