/**
 * Component opens the modal window which controlls sorting and viewing options.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux';
import BlockButton from '../../../../components/BlockButton';
import OptionsModal from './components/options-modal';

import { sortBy } from '../../../../services/constants';

class NoteDisplayOptions extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  openModal = () =>{
    const { selectionMode } = this.props;
    if(selectionMode)
      return;
      
    this.setState({modalOpen: true});
  }

  closeModal = () =>{
    this.setState({modalOpen: false});
  }

  getCurrentSort = () =>{
    const { currentPage, page } = this.props.sort;
    const sortValue = page[currentPage];
    switch(sortValue){
      case sortBy.cTime:
      return "Sort by created time";
      case sortBy.mTime:
      return "Sort by modifed time";
      case sortBy.dTime:
      return "Sort by deleted time";
      default:
      return "Sort alphabetically"
    }
  }

  render(){
    const {modalOpen} = this.state;
    return(
      <React.Fragment>
         <BlockButton
            variant="outlined"
            onClick={this.openModal}
          >
            {this.getCurrentSort()}
          </BlockButton>
        <OptionsModal open={modalOpen} handleClose={this.closeModal}/>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => ({
  sort: state.sort,
  selectionMode: state.selectionMode
});

export default connect(mapStateToProps,null)(NoteDisplayOptions);
