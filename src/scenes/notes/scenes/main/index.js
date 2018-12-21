import React, {Component} from 'react'

import Header from './components/Header';
import Notes  from '../../../../components/notes';
import NoteDisplayOptions from '../../components/note-display-options';
import Section from '../../../../components/Section'; 

import NoteData from '../../../../entities/NoteData';

import SortPageSetter from '../../components/SortPageSetter';

class Main extends Component{
  filter = (note) =>{
    return note.state === NoteData.State().normal;
  }
  
  render(){
    return (
      <React.Fragment>
        <SortPageSetter sortPage="main"/>
        <Header/>
        <Section>
          <NoteDisplayOptions/>
          <Notes filter={this.filter}/>
        </Section>
      </React.Fragment>
    );
  }
}

export default Main;
