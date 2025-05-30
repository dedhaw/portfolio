import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useCurrentMode from '../hooks/useCurrentMode';

interface NavItem {
    label: string;
    path: string;
  }
  
interface NavbarProps {
    navItems: NavItem[];
    className?: string;
  }

const Nav = styled.nav`
  border-bottom: 2px solid var(--light-gray);
  background-color: var(--white);
  padding: 5px;
`;

const NavLogo = styled.img`
  width: auto;
  height: 60px;
  padding: 0 105px;
  margin: 0px;
`;

export default function Navbar(props: NavbarProps) {
  const location = useLocation();
  const isDarkMode = useCurrentMode();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // const toggleMenu = (): void => {
  //     setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <Nav className={`navbar ${props.className}`}>
      <div className="container">
        <Link to={"/"}><NavLogo src={ isDarkMode ? "/DMlogo.png" : "/logo.png"}/></Link>
        <ul className={`navbar-links ${isMenuOpen ? 'navbar-links-active' : ''}`}>
          {props.navItems.map((item, index) => (
            <li key={`nav-item-${index}`}>
              <Link 
                to={item.path} 
                className={item.path == location.pathname ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Nav>
  )
}
