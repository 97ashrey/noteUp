import React from 'react'

import Input from '@material-ui/core/Input';

import HeaderWrapper from '../../../components/HeaderWrapper';
import BackButton from '../../../components/BackButton';


export default function Header(props) {
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
