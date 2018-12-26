import styled from 'styled-components';

const OptionsWrapper = styled.div`
  display: flex;
  height: 48px;
  width: calc(100% + 10px);
  margin: 5px 0px -5px -5px;
  ${props => (props.bgcolor)? 'background-color:' + props.bgcolor + ';' : ''}  
`;

export default OptionsWrapper;