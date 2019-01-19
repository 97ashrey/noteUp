/**
 * Reusable wrapper for the various header components troughout the project
 */
import React from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

HeaderWrapper.propTypes = {
  children: PropTypes.node
}

function HeaderWrapper({children, position = 'static',color = 'default',...rest}){
  return (
    <AppBar position={position} color={color} {...rest}>
      <ToolBar>
        {children}
      </ToolBar>
    </AppBar>
  );
}

export default HeaderWrapper;

