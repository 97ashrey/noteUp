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
        <div>
        <p>This is a small project i built to test and improve my skills.</p>
        <p>
        Here i tried to reverse engineer a mobile app for taking notes.
        For design i used <a href="https://material-ui.com/">material-ui</a> and <a href="https://www.styled-components.com/">styled-components</a>
        </p>

        <p>
          Git repo
        </p>
        </div>        
      </Section>
    </React.Fragment>
  )
}

export default About;