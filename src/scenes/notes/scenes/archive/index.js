import React from 'react'

import Section from '../../../../components/Section';
import NoteDisplayOptions from '../../components/note-display-options';
import Notes from '../../components/notes';
import Header from './components/Header';
import NoteData from '../../../../entities/NoteData';
import withSortPageSetter from '../../HOC/SortPageSetter';
import { page } from '../../../../services/constants';


function Archive() {
  function filter (note){
    return note.state === NoteData.State().archived;
  }

  return (
    <React.Fragment>
      <Header/>
      <Section>
      <NoteDisplayOptions/>
       <Notes page={page.archive} filter={filter}/> 
      </Section>
    </React.Fragment>
  )
}

export default withSortPageSetter(page.archive)(Archive);
