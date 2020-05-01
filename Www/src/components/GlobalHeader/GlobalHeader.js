import './styles'
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  HeaderSideNavItems,
  SideNavItems,
} from "carbon-components-react/es/components/UIShell";
import ToggleTheme from "../ToggleTheme"

const GlobalHeader = (props) => {

  return (
    <>
    <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="All1Map">
                <SkipToContent />
                <HeaderMenuButton
                  aria-label="Open menu"
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
                <HeaderName element={NavLink} to="/" prefix="">
                  All1Map
                </HeaderName>
                <HeaderNavigation aria-label="Carbon Tutorial">
                  <HeaderMenuItem element={NavLink} to="/about">About</HeaderMenuItem>
                  <HeaderMenuItem element={NavLink} to="/help">Help</HeaderMenuItem>
                  <HeaderMenuItem element={NavLink} to="/contact">Contact</HeaderMenuItem>
                  <HeaderMenuItem element={NavLink} to="/theme">Theme</HeaderMenuItem>
                </HeaderNavigation>
                <SideNav
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}
                  isPersistent={false}>
                  <SideNavItems>
                    <HeaderSideNavItems>
                      <HeaderMenuItem element={NavLink} to="/about">About</HeaderMenuItem>
                      <HeaderMenuItem element={NavLink} to="/help">Help</HeaderMenuItem>
                      <HeaderMenuItem element={NavLink} to="/contact">Contact</HeaderMenuItem>
                      <HeaderMenuItem element={NavLink} to="/theme">Theme</HeaderMenuItem>
                    </HeaderSideNavItems>
                  </SideNavItems>
                </SideNav>
              </Header>
            </>
          )}
        />
    <ToggleTheme theme={props.theme} toggleTheme={props.toggleTheme}/>
    </>
  )
};

GlobalHeader.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default GlobalHeader;
