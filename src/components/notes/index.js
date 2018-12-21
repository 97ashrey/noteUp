import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSort } from '../../actions/noteSortActions';
import { withRouter } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';
import NoteItem from './components/note-item';
import NoNotes from './components/NoNotes';

import { viewType, sortBy } from '../../services/constants';
class Notes extends Component {

  renderNotes = () => {
    const { notes, filter } = this.props;
    return notes.filter(filter);
  }

  sortNotes = (notes) => {
    const { currentPage, page } = this.props.sort;
    const sortVal = page[currentPage];
    switch (sortVal) {
      case sortBy.cTime:
      return notes.sort((note1, note2) => note2.cTime - note1.cTime);      
      case sortBy.dTime:
      return notes.sort((note1, note2) => note2.dTime - note1.dTime);      
      case sortBy.mTime:
      return notes.sort((note1, note2) => note2.mTime - note1.mTime);      
      default:
      return notes.sort((note1, note2) => note1.body.charCodeAt(0) - note2.body.charCodeAt(0));
    }
  }

  render() {
    const { view } = this.props;
    const notes = this.sortNotes(this.renderNotes());
    return (
      (notes.length === 0) ?
        <NoNotes>There are no notes</NoNotes>
        :
        <NotesContainer grid={view === viewType.grid}>
          {notes.map(note => {
            return (
              <NoteItem key={note.id} noteData={note} />
            );
          })}
        </NotesContainer>
    );
  }
}

Notes.defaultProps = {
  filter: () => true
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.func.isRequired,
  change: PropTypes.any
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  view: state.view,
  sort: state.sort
});

export default withRouter(connect(mapStateToProps, { setSort })(Notes));
