import styled from 'styled-components';
import bgImage from '../../../img/note-background.png';
import {height as infoHeight} from './note-info/components/InfoWrapper';

const TextArea = styled.textarea`
  height: calc(100% - calc(${infoHeight} + 10px));
  width: 100%;
  resize: none;
  font-size: 1.3em;
  line-height: 30px;
  font-family: Roboto;
  margin-top: 10px;
  background-image: url(${bgImage});
  background-attachment: local;
  &[readonly]{
    border: none;
    background-color: transparent;
    user-select: none;
    cursor: pointer;
    outline: none;
  }

  &[readonly]:focus{
    outline: none;
  }
`;

export default TextArea;
