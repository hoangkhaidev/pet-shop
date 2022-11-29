/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link as LinkR } from "react-router-dom";

export const Nav = styled(Navbar)`

  display: flex;
  margin-top: -17px;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  /*max-width: 1100px;*/
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 35px;
    transform: translate(-100%, 60%);
    font-size: 1.4rem;
    cursor: pointer;
    margin: 0;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -24px;
  float: left;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinkR = styled(LinkR)`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;
  color: #1b262c;
  font-size: 0.9 rem;
  font-weight: bold;
  margin-right: 24px;
  text-decoration: none;

  &.active {
    border-bottom: 3px solid #3282b8;
  }

  &:hover {
    text-decoration: none;
    color: #414b52;
  }
`;
