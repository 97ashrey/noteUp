import styled from 'styled-components';
import BlockButton from '../../BlockButton';

const NoteLink = styled(BlockButton)`
&&{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  background-color: #ffcf42;
  border: 2px solid transparent;
  }
  
  &&:hover{
    background-color: #d1a629;
  }

  ${props => props.selected && selected()}
`;

function selected(){
  return `
    &&{
      border-color: black;
      background-color: #ccc;
    }

    &&:hover{
      background: none;
    }
  `;
}


export default NoteLink;