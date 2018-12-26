import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setSort } from '../../../../actions/noteSortActions';
import { setSelectionMode } from '../../../../actions/selectionModeActions';

import NotesContainer from '../../../../components/NotesContainer';
import NoteItem from '../../../../components/note-item';
import NoNotes from '../../../../components/NoNotes';
import SelectionModeController from './components/selection-mode-controller';

import { viewType, sortBy, page as Page } from '../../../../services/constants';

class Notes extends Component {
  constructor(props) {
    super(props);

    // check for mobile device to disable mouse events
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
        this.mobile = true;
      }

    this.timerID = null;
    this.state = {
      notes: this.adaptNotes(),
    }
  }

  static getDerivedStateFromProps(props,prevState){
    // check if new filtered notes that are coming from props
    // are diferent from the previous ones by comparing array lengths
    const { filter, notes : newNotes } = props;
    const { notes: oldNotes } = prevState;
    const filtered = newNotes.filter(filter);
    if(filtered.length !== oldNotes.length){
      return {
        notes: filtered.map(note => {
          note.selected = false;
          return note;
        })
      }
    } 
    return null;
  }

  // Filter notes and add selected atribute to NoteData
  adaptNotes = () =>{
    const { notes, filter } = this.props;
    return notes.filter(filter).map(note => {
      note.selected = false;
      return note;
    });
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

  getNoteIndex = (id) => {
    const { notes } = this.state;
    return notes.findIndex(note => note.id === id);
  }

  getSelectedNotes = () =>{
    const {notes} = this.state;
    return notes.filter(note => note.selected === true);
  }

  selectedNotesCount = () => {
    return this.getSelectedNotes().length;
  }

  noteSelectHandler = (id) => {
    const { notes } = this.state;
    const index = this.getNoteIndex(id);
    const selected = notes[index].selected;
    notes[index].selected = selected ? false : true;
    this.setState({ notes });
    if (this.selectedNotesCount() <= 0) {
      this.props.setSelectionMode(false);
    }
  }

  exitSelectionMode = () =>{
    const {notes} = this.state;
    notes.forEach(note => note.selected = false);
    this.setState({
      notes,
    });
    this.props.setSelectionMode(false);
  }

  selectAll = () =>{
    const { notes } = this.state;
    notes.forEach(note => {
      if(note.selected)
        return;
      note.selected = true});
    this.setState({
      notes
    })
  }

  hold = (id) => {
    const { selectionMode } = this.props;
    if (selectionMode)
      return;

    // start a timeout
    this.timerID = setTimeout(() => {
      this.props.setSelectionMode(true);
      this.noteSelectHandler(id);
      this.mDownEvent = true;
    }, 800);
  }

  release = (e,id) => {
    const { selectionMode } = this.props;
    clearTimeout(this.timerID);
    if (this.mDownEvent) {
      e.preventDefault();
      this.mDownEvent = false;
      return;
    }
    if (selectionMode) {
      e.preventDefault(); // disable routing
      // select or unselect note
      this.noteSelectHandler(id);
    } 
  }

  mouseHandler = (id, e) => {
    if (this.mobile)
      return;
    
    const button = e.button;
    if(button !== 0)
      return;
    
    switch (e.type) {
      case 'mousedown':
          this.hold(id);
      break;
      case 'click':
        this.release(e,id);
      break;
      case 'mouseleave':
        // cancel touch hold
        clearInterval(this.timerID)
      break;
      default:
      break;
    }
  }

  touchHandler = (id,e) =>{
    switch(e.type){
      case 'touchstart':
        this.hold(id);
      break;
      case 'touchend':
        this.release(e,id);
      break;
      // touch move
      default:
        clearTimeout(this.timerID);
      break;
    }
  }

  makeSelectionModeController = () =>{
    const { page } = this.props;
    const { notes } = this.state;
    const selectionControlls = {
      selectAll: this.selectAll,
      exit: this.exitSelectionMode,
      count: this.selectedNotesCount,
      size: notes.length,
      getSelectedNotes: this.getSelectedNotes,
      page
    }

    return <SelectionModeController {...selectionControlls}/>
  }

  render() {
    const { notes} = this.state;
    const { selectionMode, view, page } = this.props;
    const notesToRender = this.sortNotes(notes);

    return (
      <React.Fragment>
        {
        (notesToRender.length === 0) ?
        <NoNotes>
          { page === Page.main && 'Create some notes' }
          { page === Page.archive && 'Archive is empty' }
          { page === Page.trash && 'Trash can is empty' }
        </NoNotes>
        :
        <NotesContainer grid={view === viewType.grid}>
          {notesToRender.map(note => {
            const mouseHandler = this.mouseHandler.bind(this,note.id);
            const touchHandler = this.touchHandler.bind(this,note.id);
            return (
              <NoteItem key={note.id} noteData={note}
                onMouseDown={mouseHandler}
                onClick={mouseHandler}
                onMouseLeave={mouseHandler}
                onTouchStart={touchHandler}
                onTouchEnd={touchHandler}
                onTouchMove={touchHandler} />
            );
          })}
        </NotesContainer>}
        {selectionMode && this.makeSelectionModeController()}      
      </React.Fragment>
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
  sort: state.sort,
  selectionMode: state.selectionMode
});

export default connect(mapStateToProps, { setSort, setSelectionMode })(Notes);
