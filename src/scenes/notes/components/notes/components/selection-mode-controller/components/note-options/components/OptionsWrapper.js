import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

const OptionsWrapper = styled.div`
  display: flex;
  height: 48px;
  width: calc(100% + 10px);
  margin: 5px 0px -5px -5px;
  background-color: ${props => props.theme.palette.primary.dark}; 
`;

export default withTheme()(OptionsWrapper);