import React from 'react';

import ControllWraper from './ControllWraper';

import IconButton, {iconType} from '../../../../../../../components/IconButton';

function SelectionControlls({exit,count,size,selectAll}){

  // just calls functions
  return (
    <ControllWraper>
      <IconButton icon={iconType.done} onClick={exit} color="inherit"/>
      <span style={{padding:'10px'}}>{count()}/{size}</span>
      <IconButton icon={iconType.borderClear} onClick={selectAll} color="inherit" style={{display: 'block', marginLeft: 'auto'}}/>
    </ControllWraper>
  );
}

export default SelectionControlls