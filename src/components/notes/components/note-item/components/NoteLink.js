import styled from 'styled-components';
import BlockButton from '../../../../BlockButton';

const NoteLink = styled(BlockButton)`
&&{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  background-color: #ffcf42;
  }

  &&:hover{
    background-color: #d1a629;
  }

`;


export default NoteLink;