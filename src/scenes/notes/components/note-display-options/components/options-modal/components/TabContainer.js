import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}



export default TabContainer;