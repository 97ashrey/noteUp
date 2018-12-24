import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAllNotes } from '../../../../actions/notesActions';

import Section from '../../../../components/Section';
import NoteDisplayOptions from '../../components/note-display-options';
import Notes from '../../components/notes';
import Header from './components/Header';
import NoteData from '../../../../entities/NoteData';

import Modal from '../../../../components/Modal';
import SortPageSetter from '../../components/SortPageSetter';

import { page } from '../../../../services/constants';

class TrashCan extends Component {

  constructor(props){
    super(props);
    this.state = {
      modal: {
        open: false,
        yesCallback: null,
        noCallBack: null,
        title: '',
        message: ''
      }
    }
  }

  openModal = () =>{
    this.setState({
      modal: {
        open: true,
        yesCallback: this.props.deleteAllNotes,
        noCallBack: null,
        title: 'Delete',
        message: 'Delete all notes in the trash can?'
      }
    })
  }

  closeModal = () =>{
    const { modal } = this.state;
    modal.open = false;
    this.setState({
      modal
    })
  }

  filter = (note) =>{
    return note.state === NoteData.State().deleted;
  }

  render(){
    const {modal} = this.state;
    modal.handleClose = this.closeModal;

    return (
      <React.Fragment>
        <SortPageSetter sortPage={page.trash}/>
        <Header deleteClick={this.openModal}/>
        <Section>
          <NoteDisplayOptions/>
          <Notes page={page.trash} filter={this.filter}/> 
        </Section>

        <Modal  {...modal}
        />
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
export default connect(null,mapDispatchToProps)(TrashCan);
