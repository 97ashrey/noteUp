import React from 'react'

import Header from './components/Header';
import Notes  from '../../components/notes';
import NoteDisplayOptions from '../../components/note-display-options';
import Section from '../../../../components/Section'; 

import NoteData from '../../../../entities/NoteData';

import SortPageSetter from '../../components/SortPageSetter';
import { page } from '../../../../services/constants';

function Main(){
  
  function filter(note){
    return note.state === NoteData.State().normal;
  }

  return (
    <React.Fragment>
      <Header/>
      <Section>
        <NoteDisplayOptions/>
        <Notes page={page.main} filter={filter}/>
      </Section>
      <SortPageSetter sortPage={page.main}/>
    </React.Fragment>
  );
}

export default Main;
