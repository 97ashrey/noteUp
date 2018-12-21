import React from 'react';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import IconButton, {iconType} from '../../../../../components/IconButton';
import SideMenu from '../../../../../components/side-menu';
import HeaderWrapper from '../../../../../components/HeaderWrapper';

function Header() {
  return (
    <HeaderWrapper>
      <SideMenu />
        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
          NoteUp
        </Typography>
        <IconButton icon={iconType.add} color="inherit" component={Link} to="/note"/>
        <IconButton icon={iconType.search} color="inherit" component={Link} to="/search"/>
    </HeaderWrapper>
  )
}

export default Header;
