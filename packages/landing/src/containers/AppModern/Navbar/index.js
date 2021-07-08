import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { openModal } from '@redq/reuse-modal';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';
import cloudbase from '@cloudbase/js-sdk';
import Logo from 'common/components/UIElements/Logo';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import useOnClickOutside from 'common/hooks/useOnClickOutside';
import NavbarWrapper, { MenuArea, MobileMenu, Search } from './navbar.style';
import actions from '../../../redux/actions';
import AccountSelectionModal, {CloseComponent} from '../../../common/components/AccountSelectionModal';

import { navbar } from 'common/data/AppModern';

const truncateMiddle = require('truncate-middle');

const Navbar = ({ isLight, account, setAccount }) => {
  const { navMenu } = navbar;
  const [state, setState] = useState({
    search: '',
    searchToggle: false,
    mobileMenu: false,
  });

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () =>
    setState({ ...state, searchToggle: false })
  );

  const toggleHandler = (type) => {
    if (type === 'search') {
      setState({
        ...state,
        search: '',
        searchToggle: !state.searchToggle,
        mobileMenu: false,
      });
    }

    if (type === 'menu') {
      setState({
        ...state,
        mobileMenu: !state.mobileMenu,
      });
    }
  };

  const handleOnChange = (event) => {
    setState({
      ...state,
      search: event.target.value,
    });
  };

  const handleSearchForm = (event) => {
    event.preventDefault();

    if (state.search !== '') {
      console.log('search data: ', state.search);

      setState({
        ...state,
        search: '',
      });
    } else {
      console.log('Please fill this field.');
    }
  };

  const scrollItems = [];

  navMenu.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleRemoveMenu = () => {
    setState({
      ...state,
      mobileMenu: false,
    });
  };

  const showAccountSelectionModal = async () => {
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });
    const auth = app.auth();
    await auth.anonymousAuthProvider().signIn();

    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();

    const addresses = _.map(allAccounts, (account) => {
      return account.address;
    });

    openModal({
      config: {
        className: 'customModal',
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        animationFrom: { transform: 'scale(0.3)' }, // react-spring <Spring from={}> props value
        animationTo: { transform: 'scale(1)' }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        }, // react-spring config props
        
      },
      withRnd: false,
      overlayClassName: 'customeOverlayClass',
      closeOnClickOutside: false,
      component: AccountSelectionModal,
      componentProps: { addresses, onClick: (address) => {
        setAccount(address);
      } },
      closeComponent: CloseComponent,
    });
  }

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo
          href="/"
          logoSrc={ isLight ? "https://res.cloudinary.com/forgelab-io/image/upload/v1619317508/OAK/oak-logo.png" : "https://res.cloudinary.com/forgelab-io/image/upload/v1618793068/OAK/logo-horizontal.png" }
          title="App Modern"
          className="main-logo"
        />
        <Logo
          href="/"
          logoSrc="https://res.cloudinary.com/forgelab-io/image/upload/v1618793068/OAK/logo-horizontal.png"
          title="App Modern"
          className="logo-alt"
        />
        {/* end of logo */}

        <MenuArea className={state.searchToggle ? 'active' : ''}>
          <ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84} />
          {account && <Button style={{ marginLeft: 20 }} title={truncateMiddle(account, 4, 4, '...')} onClick={showAccountSelectionModal}/>}
          {/* end of main menu */}

          <Button
            className="menubar"
            icon={
              state.mobileMenu ? (
                <Icon className="bar" icon={x} />
              ) : (
                <Fade>
                  <Icon className="close" icon={menu} />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={() => toggleHandler('menu')}
          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${state.mobileMenu ? 'active' : ''}`}>
        <Container>
          <Scrollspy
            className="menu"
            items={scrollItems}
            offset={-84}
            currentClassName="active"
          >
            {navMenu.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink
                  href={menu.path}
                  offset={menu.offset}
                  onClick={handleRemoveMenu}
                >
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </Scrollspy>
          {/* <Button title="Try for Free" /> */}
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

const mapStateToProps = (state) => ({
  account: state && state.account,
});

const mapDispatchToProps = (dispatch) => ({
	setAccount: (account) => dispatch(actions.setAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
