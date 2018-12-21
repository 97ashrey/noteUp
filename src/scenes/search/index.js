import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Section from '../../components/Section';
import Notes from '../../components/notes';

import Header from './components/Header';
 

class Search extends Component {
  constructor(){
    super();

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
    return (
      <React.Fragment>
        <Header onChangeHandler={this.onChangeHandler}/>
        <Section>
          <Notes changed={this.state.search} filter={this.filter}/>
        </Section>
      </React.Fragment>
    )
  }
}

Search.propTypes = {
  notes: PropTypes.array.isRequired
}

const mapStateToProps = (state) =>({
  notes: state.notes
});

export default connect(mapStateToProps,null)(Search);

