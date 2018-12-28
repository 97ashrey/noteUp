import styled from 'styled-components';
export const padding = "5px"

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${padding};
  background-color: ${props => (props.bgcolor)? props.bgcolor: 'transparent'};
`;

export default Section;