import React from 'react'
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

import HeaderWrapper from '../../../components/HeaderWrapper';
import BackButton from '../../../components/BackButton';

Header.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
}

function Header(props) {
  const { onChangeHandler } = props;
  return (
    <HeaderWrapper>
      <BackButton />
      <Input
        autoFocus
        autoComplete="off"
        name="search"
        placeholder="Search"
        onChange={onChangeHandler}
      />
    </HeaderWrapper>
   )
}

export default Header;
