import styled from 'styled-components';

import { sectionPadding } from '../Section';

export const NoteItem = styled.div`
  background-color: #ffeb9b;
  border-left: 5px solid #f7d13b;
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  color: black;
  &:hover{
    background-color: #f7d13b;
  }
`;

export const NotesContainer = styled.div`
  & > * {
    margin-bottom: ${sectionPadding};
    display: block;
  }

  & > *:last-child{
    margin-bottom: 0px;
  }
`;