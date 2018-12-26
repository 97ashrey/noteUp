import React from 'react';

import ControllWraper from './components/ControllWraper';

import IconButton, {iconType} from '../../../../../../../../components/IconButton';

function SelectionControlls({exit,count,size,selectAll, bgcolor}){

  return (
    <ControllWraper position="absolute" bgcolor={bgcolor} >
      <IconButton icon={iconType.done} onClick={exit} color="inherit" 
      style={{marginLeft: '-12px', marginRight: '10px'}}/>
      <span>{count()}/{size}</span>
      <IconButton icon={iconType.borderClear} onClick={selectAll} color="inherit" style={{display: 'block', marginLeft: 'auto'}}/>
    </ControllWraper>
  );
}

export default SelectionControlls