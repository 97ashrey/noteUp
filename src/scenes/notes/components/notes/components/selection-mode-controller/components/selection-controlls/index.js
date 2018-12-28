import React from 'react';

import ControllWraper from './components/ControllWraper';

import IconButton, {iconType} from '../../../../../../../../components/IconButton';
import {pullLeft} from '../../../../../../../../inline-styles';

function SelectionControlls({exit,count,size,selectAll}){

  return (
    <ControllWraper position="absolute">
      <IconButton icon={iconType.done} onClick={exit} color="inherit" 
      style={pullLeft}/>
      <span style={{flexGrow: 1}}>{count()}/{size}</span>
      <IconButton icon={iconType.borderClear} onClick={selectAll} color="inherit"/>
    </ControllWraper>
  );
}

export default SelectionControlls