import styled from 'styled-components';

import {Section} from '../Section';
import {HeaderWrapper} from '../HeaderWrapper';

export const NoteHeaderWrapper = styled(HeaderWrapper)`
  background-color: #f7d13b;
  box-shadow: none;
`;

export const NoteContentForm = styled.form`
  height: 95%;
  border-top: 2px solid #f7d13b;
`; 

export const TextArea = styled.textarea`
  resize: none;
  border: none;
  display: block; 
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow-y: auto;
  outline: none;
  line-height: 30px;
  font-size: 1.5em;
`;

export const NoteInfoWrapper = styled.div`
display: flex;
height: 5%;
justify-content: space-between;
align-items: center;
margin-bottom: 5px;
`;

export const Group = styled(Section)`
  background-color: #ffeb9b;
  height: 92vh;
`;