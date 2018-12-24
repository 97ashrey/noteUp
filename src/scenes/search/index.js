import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import Section from '../../components/Section';
import NotesContainer from '../../components/NotesContainer';
import NoteItem from '../../components/note-item';

import  { page } from '../../services/constants';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  onChangeHandler = (e) =>{
    this.setState({search: e.target.value});
  }

  filter = (note) =>{
    const search = this.state.search.toLocaleLowerCase();
    const {body, title} = note;
    return (search !== '')? (body.toLowerCase().includes(search) || title.toLowerCase().includes(search)): false;
  }
  render() {
    const { notes } = this.props;
    const notesToRender = notes.filter(this.filter);
    return (
      <React.Fragment>
        <Header onChangeHandler={this.onChangeHandler}/>
        <Section>
          <NotesContainer>
            {notesToRender.map(note => 
              <NoteItem key={note.id} noteData={note}/>
            )}
          </NotesContainer>
        </Section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) =>({
  notes: state.notes
});

export default connect(mapStateToProps,null)(Search);

