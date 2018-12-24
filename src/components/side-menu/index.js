import React, { Component } from 'react'

import IconButton, {iconType} from '../IconButton';
import Drawer from '@material-ui/core/Drawer';
import NavList from './components/List';

class SideMenu extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <React.Fragment>
        <IconButton 
          style={{marginLeft: '-12px', marginRight: '10px'}}
          icon={iconType.menu}
          color="inherit" aria-label="Menu"
          onClick={this.toggleDrawer('left', true)}/>

        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <NavList />
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default SideMenu;
