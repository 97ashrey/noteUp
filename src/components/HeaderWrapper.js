import React from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

HeaderWrapper.propTypes = {
  children: PropTypes.node
}

function HeaderWrapper({children}){
  return (
    <AppBar position="static" color="default">
      <ToolBar>
        {children}
      </ToolBar>
    </AppBar>
  );
}

export default HeaderWrapper;

