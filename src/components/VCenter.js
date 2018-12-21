import styled from 'styled-components';

const VCenter = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width? props.width: 'auto'};
`;

export default VCenter;