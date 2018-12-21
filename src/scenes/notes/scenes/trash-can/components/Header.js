import React from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton, { iconType } from '../../../../../components/IconButton';
import SideMenu from '../../../../../components/side-menu';
import HeaderWrapper from '../../../../../components/HeaderWrapper';

function Header(props) {
  const { deleteClick } = props;
  return (
    <HeaderWrapper>
      <SideMenu />
      <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
        Trash Can
      </Typography>
      <IconButton icon={iconType.deleteForever} color="inherit" onClick={deleteClick}/>
    </HeaderWrapper>
  )
}

export default (Header);
