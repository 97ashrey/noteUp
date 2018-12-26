import styled from 'styled-components';

import HeaderWrapper from '../../../../../../../../../components/HeaderWrapper';

const ControllWrapper = styled(HeaderWrapper)`
  &&{
    box-shadow: none;
    ${props => (props.bgcolor)? 'background-color:' + props.bgcolor + ';' : ''}
  }
`;


export default ControllWrapper;