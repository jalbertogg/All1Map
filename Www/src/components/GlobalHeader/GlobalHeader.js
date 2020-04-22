import React from "react";
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

import Light20 from "@carbon/icons-react/lib/light/20";

const GlobalHeader = () => (
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
              <HeaderName href="/" prefix="">
                All1Map
              </HeaderName>
              <HeaderNavigation aria-label="Carbon Tutorial">
                <HeaderMenuItem href="/about">About</HeaderMenuItem>
                <HeaderMenuItem href="/help">Help</HeaderMenuItem>
                <HeaderMenuItem href="/contact">Contact</HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="theme">
                  <Light20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem href="#">About</HeaderMenuItem>
                    <HeaderMenuItem href="#">Help</HeaderMenuItem>
                    <HeaderMenuItem href="#">Contact</HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
);
export default GlobalHeader;
