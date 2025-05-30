import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useCurrentMode from '../hooks/useCurrentMode';

import { IoMenu, IoClose } from "react-icons/io5";

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

  @media (max-width: 768px) {
    padding: 0 45px;
  }
`;

const Menu = styled.div`
  padding: 0 45px;
  display: flex;
  align-items: center;
  color: var(--dark-gray);
  
  > * {
    cursor: pointer;
    user-select: none;
  }
`;

const MobileMenu = styled.div<{$isOpen: boolean}>`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background: var(--white);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 60px 0 0 0;
  
  > * {
    cursor: pointer;
  }
`;

const MenuItem = styled.li`
  margin-bottom: 20px;
  
  a {
    display: block;
    color: var(--dark-gray);
    text-decoration: none;
    font-size: 18px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    transition: color 0.2s ease;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  color: var(--dark-gray);
  outline: none;
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
  }
`;

export default function Navbar(props: NavbarProps) {
  const location = useLocation();
  const isDarkMode = useCurrentMode();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const sidebarRef = useRef<any>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current != null) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
  };

  const toggleMenu = (): void => {
      setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      setMobile(true);
    } else {
      setMobile(false);
      setIsMenuOpen(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Nav className={`navbar ${props.className}`}>
      <div className="container">
          <Link to={"/"}><NavLogo src={ isDarkMode ? "/DMlogo.png" : "/logo.png"}/></Link>
      {mobile === false && (
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
      
    )}
    {mobile === true && (
      <Menu>
        <IoMenu size={55} onClick={toggleMenu}/>
        <MobileMenu $isOpen={isMenuOpen} ref={sidebarRef}>
          <MenuItems>
            <CloseButton>
              <IoClose size={25} onClick={toggleMenu}/>
            </CloseButton>
            {props.navItems.map((item, index) => (
              <MenuItem key={`nav-item-${index}`}>
                <Link 
                  to={item.path} 
                  className={item.path == location.pathname ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </MobileMenu>
      </Menu>
    )}
      </div>
    </Nav>
  )
}
