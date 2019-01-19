/**
 * Component controlls how note-items are being displayed
 * Grid or List view
 */
import styled from 'styled-components';

import {padding} from './Section';

import PropTypes from 'prop-types';

const NotesContainer = styled.div`
  flex: 1;
  margin-top: ${padding};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &&& > *{
    min-height: calc(60px - ${padding});
    max-height: calc(60px - ${padding});
    margin-bottom: ${padding};
  }

  &&& > *:last-child{
    margin-bottom: 0px;
  }

  ${props => (props.grid) && grid()}

`;

function grid(){
  return `
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;

    &&& > *{
      margin-right: ${padding};
      width: calc(50% - calc(${padding} / 2));
    }

    &&& > *:nth-child(even){
      margin-right: 0px;
    }

    &&& > *:nth-last-child(2){
      margin-bottom: 0px;
    }
  `;
}

NotesContainer.propTypes = {
  grid: PropTypes.bool
}

export default NotesContainer;