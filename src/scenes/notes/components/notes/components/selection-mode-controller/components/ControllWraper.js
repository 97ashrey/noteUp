import styled from 'styled-components';

import VCenter from '../../../../../../../components/VCenter';

const mHeight = '56px';
const height = '64px'

const ControllWrapper  = styled(VCenter)`
  width: 100%;
  height: calc(${mHeight});
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #ddd;
  padding: 10px 20px;
  @media screen and (min-width: 576px){
    height: calc(${height});
  }
`;

export default ControllWrapper;