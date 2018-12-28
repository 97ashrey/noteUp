import React from 'react';
import { withRouter } from 'react-router-dom';

import IconButton, {iconType} from './IconButton';
import { pullLeft } from '../inline-styles';

const BackButton = (props) => {
  function goBack() {
    props.history.goBack();
  }
  return (
    <IconButton 
      style={pullLeft}
      icon={iconType.arrowBack}
      onClick={goBack}
      color="inherit"/>
  );
}

export default withRouter(BackButton);