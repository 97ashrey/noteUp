import styled from 'styled-components';
import bgImage from '../../../img/note-background.png';
import {height as infoHeight} from './note-info/components/InfoWrapper';

const TextArea = styled.textarea`
  height: calc(100% - calc(${infoHeight} - 5px));
  width: 100%;
  resize: none;
  font-size: 1.3em;
  line-height: 30px;
  font-family: Roboto;
  margin-top: 5px;
  outline: none;
  border: none;
  background-color: transparent;
  background-image: url(${bgImage});
  background-attachment: local;
  
  &[readonly]{
    border: none;
    background-color: transparent;
    user-select: none;
    cursor: pointer;
  }
`;

export default TextArea;
