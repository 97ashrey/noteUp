import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { setSort } from '../../../../../../../actions/noteSortActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Badge from '@material-ui/core/Badge';

import { sortBy } from '../../../../../../../services/constants';



class SortOptionsList extends Component{

  listClick = (value) =>{
    const {clickCallback, setSort, sort} = this.props;
    setSort(sort.currentPage,value);
    clickCallback();
  }

  render(){
    const { location } = this.props;
    const path = location.pathname;
    return(
      <List>  
        <ListItem button onClick={this.listClick.bind(this,sortBy.cTime)}>
          <ListItemIcon>
            <Badge badgeContent="+" color="default">
              <ScheduleIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="by created time" />
        </ListItem>
        {
          // if not on trash page render mTime otherwise dTime
          (!path.includes('trash'))?
             <ListItem button onClick={this.listClick.bind(this,sortBy.mTime)}>
             <ListItemIcon>
               <ScheduleIcon />
             </ListItemIcon>
             <ListItemText primary="by modifed time" />
           </ListItem>
            :
            <ListItem button onClick={this.listClick.bind(this,sortBy.dTime)}>
              <ListItemIcon>
                <Badge badgeContent=":(" color="default">
                  <ScheduleIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="by deleted time" />
            </ListItem>
          
        }
        <ListItem button onClick={this.listClick.bind(this,sortBy.AZ)}>
          <ListItemIcon>
            <SortByAlphaIcon />
          </ListItemIcon>
          <ListItemText primary="alphabeticaly" />
        </ListItem>
      </List>
    );
  }
}

SortOptionsList.propTypes = {
  clickCallback: PropTypes.func,
}

SortOptionsList.defaultProps = {
  clickCallback: () => false
}

const mapStateToProps = (state) => ({
  sort: state.sort
});

export default withRouter(connect(mapStateToProps,{setSort})(SortOptionsList));