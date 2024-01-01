import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { MenuForSetUrl as Menu } from './Nav.js';

export const Wrapper = styled.nav `
  display: flex;
  position: sticky;
  top: 0;
  width: ${props => (props.scrl ? 'calc(100% - 24px)' : 'calc(100% - 16px)')};
  height: 60px;
  margin: ${props => (props.scrl ? '0 16px 0 8px' : '0 8px')};
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #bfbfbf;
  grid-row: 1;
`;

export const Menu = styled.div `
  display: flex;
  width: 100%;
  min-width: 60px;
  height: 60px;
  margin: 0px 8px;
  align-items: center;
  justify-content: center;

  & > a {
    display: flex;
    text-decoration: none;
    color: #333;
    font-size: 1em;
  }
`;




const useMenuData = () => {
  const data = [
    {
      id: 'home',
      url: '/',
      text: 'Home',
    },
    {
      id: 'handle-open-api',
      url: '/handle-open-api',
      text: 'API 포트폴리오',
    },
    {
      id: 'handle-rest-api',
      url: '/handle-rest-api',
      text: 'REST API 포트폴리오',
    },
    {
      id: 'about',
      url: '/about',
      text: 'About',
    },
  ];

  return data;
}


const Nav = ({ nowScroll }) => {
  const menuData = useMenuData();

  return (
    (nowScroll ? (
      <>
        <Wrapper scrl>
          {menuData.map(dat => (
          <Menu key={dat.id}>
            <Link to={dat.url}><span>{dat.text}</span></Link>
          </Menu>
        ))}
        </Wrapper>
      </>
    ) : (
      <>
        <Wrapper>
          {menuData.map(dat => (
          <Menu key={dat.id}>
            <Link to={dat.url}><span>{dat.text}</span></Link>
          </Menu>
        ))}
        </Wrapper>
      </>
    ))
  )
}

export default Nav;