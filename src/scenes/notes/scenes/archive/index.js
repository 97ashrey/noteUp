import React from 'react'

import Section from '../../../../components/Section';
import NoteDisplayOptions from '../../components/note-display-options';
import Notes from '../../../../components/notes';
import Header from './components/Header';
import NoteData from '../../../../entities/NoteData';
import SortPageSetter from '../../components/SortPageSetter';

function Archive() {
  function filter (note){
    return note.state === NoteData.State().archived;
  }

  return (
    <React.Fragment>
        <SortPageSetter sortPage="archive"/>

      <Header/>
      <Section>
      <NoteDisplayOptions/>
       <Notes filter={filter}/> 
      </Section>
    </React.Fragment>
  )
}

export default Archive;
