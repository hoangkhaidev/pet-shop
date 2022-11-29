/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  Nav,
  NavbarContainer,
  MobileIcon,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {

  return (
    <>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <FontAwesomeIcon
                icon={faBars}
                size={'1x'}
                style={{ cursor: 'pointer', marginRight: '3px' }} 
            /> 
          </MobileIcon>
          <div style={{ position: 'absolute', top: '25px', right: '10px' }}>Menu</div>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
