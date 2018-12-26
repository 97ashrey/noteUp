import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton, { iconType } from '../../../../../components/IconButton';
import SideMenu from '../../../../../components/side-menu';
import HeaderWrapper from '../../../../../components/HeaderWrapper';

Header.propTypes = {
  deleteClick: PropTypes.func.isRequired
}

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
