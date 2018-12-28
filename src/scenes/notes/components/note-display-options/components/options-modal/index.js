import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabContainer from './components/TabContainer';
import ViewOptionsList from './components/ViewOptionsList';
import SortOptionsList from './components/SortOptionsList';



class OptionsModal extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title" style={{ padding: 0 }}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary">
              <Tab label="Sort" style={{ flexGrow: 1 }} />
              <Tab label="View" style={{ flexGrow: 1 }} />
            </Tabs>
          </AppBar>
        </DialogTitle>
        <DialogContent style={{ padding: 0, width: '300px' }}>
          {value === 0 &&
            <TabContainer>
              <SortOptionsList clickCallback={handleClose}/>
            </TabContainer>}
          {value === 1 &&
            <TabContainer>
              <ViewOptionsList clickCallback={handleClose}/>
            </TabContainer>}
        </DialogContent>
      </Dialog>
    );
  }
}
OptionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default OptionsModal;
