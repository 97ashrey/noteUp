import styled from 'styled-components';

export const height = '30px';

const InfoWrapper = styled.div`
  height: ${height};
  display: flex;
  align-items: flex-end;
  justify-content: space-between; 
  border-bottom: 1px solid #ccc;
  padding-bottom: 3px;
`;

export default InfoWrapper;