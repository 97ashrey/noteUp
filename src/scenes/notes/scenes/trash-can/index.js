import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAllNotes } from '../../../../actions/notesActions';

import Section from '../../../../components/Section';
import NoteDisplayOptions from '../../components/note-display-options';
import Notes from '../../components/notes';
import Header from './components/Header';
import NoteData from '../../../../entities/NoteData';

import withSortPageSetter from '../../HOC/SortPageSetter';

import { page } from '../../../../services/constants';

import withModalControlls from '../../../../HOC/modalControlls';

class TrashCan extends Component {
  deleteClick = () =>{
    this.props.openModal({
        yesCallback: this.props.deleteAllNotes,
        title: 'Delete',
        message: 'Delete all notes in the trash can?'
    })
  }

  filter = (note) =>{
    return note.state === NoteData.State().deleted;
  }

  render(){
    return (
      <React.Fragment>
        <Header deleteClick={this.deleteClick}/>
        <Section>
          <NoteDisplayOptions/>
          <Notes page={page.trash} filter={this.filter}/> 
        </Section>
      </React.Fragment>
    )
  }
}

TrashCan.propTypes = {
  deleteAllNotes: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  deleteAllNotes
}
export default withSortPageSetter(page.trash)(withModalControlls(connect(null,mapDispatchToProps)(TrashCan)));
