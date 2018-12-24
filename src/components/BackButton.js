import React from 'react';
import { withRouter } from 'react-router-dom';

import IconButton, {iconType} from './IconButton';

const BackButton = (props) => {
  function goBack() {
    props.history.goBack();
  }
  return (
    <IconButton 
    style={{marginLeft: '-12px', marginRight: '10px'}}
      icon={iconType.arrowBack}
      onClick={goBack}/>
  );
}

export default withRouter(BackButton);