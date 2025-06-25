import { Link } from 'react-router';
import { NavItem } from '../App';
import styled from 'styled-components';

import useCurrentMode from '../hooks/useCurrentMode';

const FooterArea = styled.footer`
  background-color: var(--light-gray);
  font-size: 14px;
  color: var(--accent-color);
  text-align: center;
`;

const Container = styled.div`
  display: flex;  
  justify-content: space-between;
  width: 70%;
  margin: 10px auto 0 auto;
  padding: 16px 0;

  a {
    color: var(--accent-color);
    text-decoration: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Section = styled.div`
    width: 300px;
`;

const Logo = styled.img`
  width: auto;
  height: 60px;
`;

const Header = styled.h3`
  color: var(--accent-color);
`;

const Border = styled.div`
  border-bottom: 2px solid rgb(202, 205, 207);
  margin-bottom: 10px;
`;

interface FooterProps {
  navItems: NavItem[];
}

export default function Footer({ navItems }: FooterProps) {
  const isDarkMode = useCurrentMode();

  return (
    <FooterArea>
        <Container>
            <Section style={{textAlign: "left"}}>
                <Link to={"/"}>
                    <Logo src={ isDarkMode ? "/DMlogo.png" : "/logo.png"}/>
                </Link>
                <p>Thanks for visiting my site! Check out more about me using the quick links and feel free to contact me with any questions.</p>
            </Section>
            <Section>
                <Header>quick links</Header>
                {navItems.map((item, index) => (
                <p key={`nav-item-${index}`}>
                    <Link to={item.path}>
                    {item.label}
                    </Link>
                </p>
                ))}
            </Section>
            <Section>
                <Header>contact me</Header>
                <p>
                    <a href="https://www.linkedin.com/in/dev-dhawan-60b713217/" target="_blank">linkedin</a>
                </p>
                <p>
                    <a href="https://github.com/dedhaw" target="_blank">github</a>
                </p>
                <p>
                    <a href="mailto:ddhawav@gmail.com">email me</a>
                </p>
            </Section>
        </Container>
        <Border />
        <div>
            <p>Built by Dev Dhawan</p>
        </div>
    </FooterArea>
  )
}
