import React from 'react'

import { Link } from 'react-router-dom';

import HeaderWrapper from '../../components/HeaderWrapper';
import Section from '../../components/Section';
import SideMenu from '../../components/side-menu';
import Typography from '@material-ui/core/Typography';
function NotFound() {
  return (
    <React.Fragment>
      <HeaderWrapper>
        <SideMenu />
      </HeaderWrapper>
      <Section>
        <Typography variant="h3">
          404
          </Typography>
        <Typography variant="h4">
          Page not found
          </Typography>
        <Typography variant="h5">
          It looks like you tried to access a page that doesn't exist. Use the menu to reach your destination or <Link to="/">go to main page</Link>.
        </Typography>
      </Section>
    </React.Fragment>
  );
}

export default NotFound;