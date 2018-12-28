import styled from 'styled-components';

import HeaderWrapper from '../../../../../../../../../components/HeaderWrapper';

import { withTheme } from '@material-ui/core/styles';

const ControllWrapper = styled(HeaderWrapper)`
  &&{
    box-shadow: none;
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;


export default withTheme()(ControllWrapper);