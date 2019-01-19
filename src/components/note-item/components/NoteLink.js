import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withTheme } from '@material-ui/core/styles';

const NoteLink = styled(ButtonBase)`
&&{
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  border: 2px solid transparent;
  background-color: ${props => props.theme.palette.primary.main};
  }
  
  // quick fix for sticky hover effects
  &&:hover{
    background-color: ${props => props.theme.palette.primary.main};
  }

  @media screen and (min-width: 576px){
    &&:hover{
      background-color: ${props => props.theme.palette.primary.light};
    }
  }

  ${props => props.selected && selected(props.theme)}
`;

function selected(theme){
  return `
    &&{
      border-color: black;
      background-color: ${theme.palette.primary.dark};
    }

    // another quick fix for sticky hovers
    &&:hover{
      background-color: ${theme.palette.primary.dark};
    }

    @media screen and (min-width: 576px){
      &&:hover{
        background-color: ${theme.palette.primary.main};
      }
    }
  `;
}


export default withTheme()(NoteLink);