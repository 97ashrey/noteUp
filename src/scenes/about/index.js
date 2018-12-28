import React from 'react'

import Typography from '@material-ui/core/Typography';
import HeaderWrapper from '../../components/HeaderWrapper';
import SideMenu from '../../components/side-menu';
import Section from '../../components/Section';

function About() {
  return (
    <React.Fragment>
      <HeaderWrapper>
      <SideMenu />
        <Typography variant="h6" color="inherit">
          About
        </Typography>
      </HeaderWrapper>
      <Section>
        <Typography variant="h4">
          NoteUp
        </Typography>
        <p>
          It was built as a test of knowledge. Users can take simple notes, and they have small utility features such as archiving notes, chaging how they are displayed (grid or list view) and some basic sorting options.<br/><br/>
          It was developed in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> using <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">material-ui</a> and <a href="https://www.styled-components.com/" target="_blank" rel="noopener noreferrer">styled-components</a> for design.
           More information can be found on the <a href="https://github.com/97ashrey/noteUp" target="_blank" rel="noopener noreferrer">github repository</a>.
        </p>

      </Section>
    </React.Fragment>
  )
}

export default About;