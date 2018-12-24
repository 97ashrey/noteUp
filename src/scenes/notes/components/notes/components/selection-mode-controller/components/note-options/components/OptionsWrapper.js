import styled from 'styled-components';
import ControllWrapper from '../../ControllWraper';

const OptionsWrapper = styled(ControllWrapper)`
  width: calc(100% + 10px);
  margin: 5px 0px -5px -5px;
  padding: 0;
  position: static;
  align-items: flex-start;
  height: 48px;
  @media screen and (min-width: 576px){
    height: 48px;
  }
`;

export default OptionsWrapper;