import React from 'react';

import Typography from '@material-ui/core/Typography';

import SideMenu from '../../../../../components/side-menu';
import HeaderWrapper from '../../../../../components/HeaderWrapper';

function Header() {
  return (
    <HeaderWrapper>
      <SideMenu />
        <Typography variant="h6" color="inherit">
          Archive
        </Typography>
    </HeaderWrapper>
  )
}

export default (Header);
